import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addFavorite, deleteFavorite } from "../../apis/favorite";
import { ReactComponent as HeartOutlinedIcon } from "../../assets/heart-03.svg";
import { ReactComponent as HeartIcon } from "../../assets/heart-04.svg";
import { ReactComponent as StarIcon } from "../../assets/star-02.svg";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";
import { comma } from "../../utils/convert";
import Button from "../common/atoms/Button";
import Card from "../common/atoms/Card";
import SquarePhoto from "../common/atoms/SquarePhoto";

// done test
const PortfolioCard = ({ portfolio, setFavorites }) => {
  const location = useLocation();
  const { isLogged } = useSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cacheKey = useRef(
    location.pathname === "/favorites" ? "favorites" : "portfolios",
  );
  const { mutate: addFavoriteMutate } = useMutation(addFavorite);
  const { mutate: deleteFavoriteMutate } = useMutation(deleteFavorite);
  const queryClient = useQueryClient();
  const { defaultErrorHandler } = useDefaultErrorHandler();

  const handleAddFavorite = () => {
    setIsSubmitting(true);
    addFavoriteMutate(
      { portfolioId: parseInt(portfolio.id, 10) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(cacheKey.current);
          setIsSubmitting(false);
        },
        onError: (error) => {
          defaultErrorHandler(error);
          setIsSubmitting(false);
        },
      },
    );
  };

  const handleDeleteFavorite = () => {
    setIsSubmitting(true);
    deleteFavoriteMutate(
      { portfolioId: parseInt(portfolio.id, 10) },
      {
        onSuccess: async () => {
          if (location.pathname === "/search") {
            queryClient.invalidateQueries(cacheKey.current);
          } else {
            setFavorites((prev) =>
              prev.filter((item) => item.id !== portfolio.id),
            );
          }
          setIsSubmitting(false);
        },
        onError: (error) => {
          defaultErrorHandler(error);
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <Card
      to={`/portfolios/${portfolio.portfolioId}`}
      className="portfolio-card"
    >
      <SquarePhoto
        src={portfolio.thumbnail}
        alt={`${portfolio.plannerName}플래너 소개 사진`}
        className="portfolio-image"
      />
      <div className="py-[9px] px-[8px] relative">
        <div className="flex text-[12px] whitespace-nowrap">
          <span className="planner-name mr-auto">
            <em className="emph-name font-bold not-italic">
              {portfolio.plannerName}
            </em>{" "}
            플래너
          </span>
          <span className="planner-location">{portfolio.location}</span>
        </div>
        <div className="planner-title pt-[1px] h-[33px] text-xs text-gray-sunsu line-clamp-2">
          {portfolio.title}
        </div>
        <div className="planner-price flex pt-[1px] text-xs">
          <em className="emph-price font-bold not-italic">
            {comma(portfolio.totalPrice)}
          </em>
          원
        </div>
        <div className="planner-contract-count flex pt-[1px] text-xs text-blue-sunsu items-center">
          {portfolio.averageRating !== 0 && (
            <>
              <span className="">
                <StarIcon className="w-[12px] h-[12px] mb-[1px] mr-[3px] justify-center" />
              </span>
              <span className="text-black mr-[3px]">
                {portfolio.averageRating.toFixed(1)}
                {" |"}
              </span>
            </>
          )}
          <span className="mr-auto">
            <em className="emph-count font-bold not-italic">
              {comma(portfolio.contractedCount)}
            </em>
            건 매칭
          </span>
          {isLogged && (
            <div className=" absolute right-0 bottom-0">
              <Button
                className=" py-[9px] px-[8px] flex justify-end items-end "
                onClick={() => {
                  if (portfolio.isFavorited) {
                    handleDeleteFavorite();
                  } else {
                    handleAddFavorite();
                  }
                }}
                disabled={isSubmitting}
              >
                {portfolio.isFavorited ? (
                  <HeartIcon
                    className="w-[11px] h-[10px]"
                    aria-label="찜하기 취소"
                  />
                ) : (
                  <HeartOutlinedIcon
                    className="w-[11px] h-[10px]"
                    aria-label="찜하기"
                  />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PortfolioCard;
