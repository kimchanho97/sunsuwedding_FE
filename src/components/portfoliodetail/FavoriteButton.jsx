import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addFavorite, deleteFavorite } from "../../apis/favorite";
import { ReactComponent as HeartOutlinedIcon } from "../../assets/heart-03.svg";
import { ReactComponent as HeartIcon } from "../../assets/heart-04.svg";
import useOpenBottomSheet from "../../hooks/useOpenBottomSheet";
import Button from "../common/atoms/Button";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";

export default function FavoriteButton({ isFavorited }) {
  const { isLogged } = useSelector((state) => state.user);
  const { mutate: addFavoriteMutate } = useMutation(addFavorite);
  const { mutate: deleteFavoriteMutate } = useMutation(deleteFavorite);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [optimisticFavorited, setOptimisticFavorited] = useState(isFavorited); // ✅ 로컬 상태 추가
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { openBottomSheetHandler } = useOpenBottomSheet();
  const { defaultErrorHandler } = useDefaultErrorHandler();

  // ✅ API 응답이 바뀌면 상태도 동기화 (외부 상태 업데이트 반영)
  useEffect(() => {
    setOptimisticFavorited(isFavorited);
  }, [isFavorited]);

  const updateCache = (newState) => {
    // ✅ 현재 포트폴리오 상세 데이터 갱신
    queryClient.setQueryData(["portfolio", id], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        data: {
          ...oldData.data,
          isFavorited: newState,
        },
      };
    });

    // ✅ 탐색 페이지에서도 찜하기 반영 (캐시 데이터 갱신)
    queryClient.setQueryData(["portfolios"], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          data: page.data.map((portfolio) =>
            portfolio.portfolioId === parseInt(id, 10)
              ? { ...portfolio, isFavorited: newState }
              : portfolio,
          ),
        })),
      };
    });
  };

  const handleAddFavorite = () => {
    if (!isLogged) {
      openBottomSheetHandler({ bottomSheet: "loginBottomSheet" });
      return;
    }
    if (optimisticFavorited || isSubmitting) return;
    setOptimisticFavorited(true);
    setIsSubmitting(true);
    updateCache(true); // ✅ 낙관적 UI 적용

    addFavoriteMutate(
      { portfolioId: parseInt(id, 10) },
      {
        onSuccess: () => {
          setIsSubmitting(false);
        },
        onError: (error) => {
          defaultErrorHandler(error);
          setOptimisticFavorited(false);
          updateCache(false); // ✅ 실패 시 원래 상태로 복구
          setIsSubmitting(false);
        },
      },
    );
  };

  const handleDeleteFavorite = () => {
    if (!optimisticFavorited || isSubmitting) return;
    setOptimisticFavorited(false);
    setIsSubmitting(true);
    updateCache(false); // ✅ 낙관적 UI 적용

    deleteFavoriteMutate(
      { portfolioId: parseInt(id, 10) },
      {
        onSuccess: () => {
          setIsSubmitting(false);
        },
        onError: (error) => {
          defaultErrorHandler(error);
          setOptimisticFavorited(true);
          updateCache(true); // ✅ 실패 시 원래 상태로 복구
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <Button
      className="w-fit flex items-center gap-1"
      onClick={
        isLogged && optimisticFavorited
          ? handleDeleteFavorite
          : handleAddFavorite
      }
      disabled={isSubmitting} // ✅ 버튼 비활성화
    >
      {isLogged && optimisticFavorited ? (
        <HeartIcon className="w-[20px] h-[20px] object-cover" />
      ) : (
        <HeartOutlinedIcon className="w-[20px] h-[20px] object-cover" />
      )}
      <span className="font-bold">찜하기</span>
    </Button>
  );
}
