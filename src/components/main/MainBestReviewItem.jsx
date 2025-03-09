import SquarePhoto from "../common/atoms/SquarePhoto";

const MainBestReviewItem = ({
  className = "",
  src,
  alt,
  plannerName,
  coupleName,
  content1,
  content2,
}) => {
  return (
    <div className="best-review-card">
      <div
        className={`flex py-[10px] mx-[10px] items-center gap-[10px] ${className}`}
      >
        <SquarePhoto
          src={src}
          alt={alt}
          className="h-[230px] w-[230px] sm:h-[190px] sm:w-[190px] xs:h-[170px] xs:w-[170px]"
        />
        <div className="flex flex-col gap-[10px] flex-1 text-sm">
          <span className="text-blue-sunsu">{plannerName} 플래너</span>
          <div>
            <span className="line-clamp-6 sm:line-clamp-5 xs:line-clamp-4 whitespace-pre-line">
              {content1}
            </span>
            <span className="line-clamp-6 sm:line-clamp-5 xs:line-clamp-4 whitespace-pre-line">
              {content2}
            </span>
          </div>
          <span className="text-gray-sunsu text-xs">{coupleName}님의 리뷰</span>
        </div>
      </div>
    </div>
  );
};

export default MainBestReviewItem;
