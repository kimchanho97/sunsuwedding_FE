import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getFavoriteList } from "../apis/favorite";
import useDefaultErrorHandler from "./useDefaultErrorHandler";

const useFetchFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const infiniteQuery = useInfiniteQuery(
    ["favorites"],
    ({ pageParam = 0 }) => getFavoriteList(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasNext ? allPages.length : undefined; // ✅ `hasNext` 값 기반으로 다음 페이지 판별
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onError: (error) => {
        defaultErrorHandler(error);
      },
    },
  );

  useEffect(() => {
    if (infiniteQuery.data) {
      setFavorites(infiniteQuery.data.pages.flatMap((page) => page.data)); // ✅ 정확한 데이터 구조로 저장
    }
  }, [infiniteQuery.data]);

  return {
    favorites,
    setFavorites,
    ...infiniteQuery,
  };
};

export default useFetchFavorites;
