import SkeletonCard from "../common/atoms/SkeletonCard";
import FavoritePortfolioCard from "./FavoritePortfolioCard";

const FavoritePortfolioGrid = ({
  portfolios,
  isFetchingNextPage,
  setFavorites,
}) => {
  return (
    <div className="portfolio-grid grid grid-cols-2 gap-[6px] p-[6px] w-full">
      {portfolios?.map((portfolio) => (
        <FavoritePortfolioCard
          key={portfolio.portfolioId}
          portfolio={portfolio}
          setFavorites={setFavorites}
        />
      ))}
      {isFetchingNextPage && (
        <>
          <SkeletonCard /> <SkeletonCard />
          <SkeletonCard /> <SkeletonCard />
        </>
      )}
    </div>
  );
};

export default FavoritePortfolioGrid;
