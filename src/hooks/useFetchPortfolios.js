import { useInfiniteQuery } from "react-query";
import { getPortfolioList } from "../apis/portfolio";

export default function useFetchPortfolios({
  name,
  location,
  minPrice,
  maxPrice,
}) {
  const infiniteQuery = useInfiniteQuery(
    // 의존성 배열 (쿼리 키)
    ["portfolios", name, location, minPrice, maxPrice],
    ({ pageParam = 0 }) =>
      getPortfolioList(pageParam, name, location, minPrice, maxPrice),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.nextCursor) {
          return lastPage?.nextCursor;
        }
        return undefined;
      },
      keepPreviousData: true,
      refetchOnWindowFocus: true,
    },
  );

  const allFetchedPortfolios = infiniteQuery?.data?.pages.flatMap(
    (page) => page?.data,
  );

  return {
    portfolios: allFetchedPortfolios,
    ...infiniteQuery,
  };
}
