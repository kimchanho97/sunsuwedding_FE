import { useState } from "react";
import { useMutation } from "react-query";
import { deleteFavorite } from "../../apis/favorite";
import { ReactComponent as HeartIcon } from "../../assets/heart-04.svg";
import { ReactComponent as StarIcon } from "../../assets/star-02.svg";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";
import { comma } from "../../utils/convert";
import Button from "../common/atoms/Button";
import Card from "../common/atoms/Card";
import SquarePhoto from "../common/atoms/SquarePhoto";

const FavoritePortfolioCard = ({ portfolio, setFavorites }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: deleteFavoriteMutate } = useMutation(deleteFavorite);
  const { defaultErrorHandler } = useDefaultErrorHandler();

  const handleDeleteFavorite = () => {
    setIsSubmitting(true);
    deleteFavoriteMutate(
      { portfolioId: parseInt(portfolio.portfolioId, 10) },
      {
        onSuccess: () => {
          // ✅ 찜 목록에서 제거
          setFavorites((prev) =>
            prev.filter((item) => item.portfolioId !== portfolio.portfolioId),
          );
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
          <span className="">
            <StarIcon className="w-[12px] h-[12px] mb-[1px] mr-[3px] justify-center" />
          </span>
          <span className="text-black mr-[3px]">
            {portfolio.averageRating.toFixed(1)}
            {" |"}
          </span>
          <span className="mr-auto">
            <em className="emph-count font-bold not-italic">
              {comma(portfolio.contractedCount)}
            </em>
            건 매칭
          </span>
          <div className=" absolute right-0 bottom-0">
            <Button
              className=" py-[9px] px-[8px] flex justify-end items-end "
              onClick={handleDeleteFavorite}
              disabled={isSubmitting}
            >
              <HeartIcon
                className="w-[11px] h-[10px]"
                aria-label="찜하기 취소"
              />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FavoritePortfolioCard;
