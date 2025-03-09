import { useInfiniteQuery } from "react-query";
import { getPortfolioListCursor } from "../apis/portfolio";

export default function useFetchPortfolios({
  name,
  location,
  minPrice,
  maxPrice,
}) {
  // 오프셋 기반 페이징
  // const infiniteQuery = useInfiniteQuery(
  //   // 의존성 배열 (쿼리 키)
  //   ["portfolios", name, location, minPrice, maxPrice],
  //   ({ pageParam = 0 }) =>
  //     getPortfolioList(pageParam, name, location, minPrice, maxPrice),
  //   {
  //     getNextPageParam: (lastPage, allPages) => {
  //       return lastPage.hasNext ? allPages.length : undefined; // ✅ 다음 페이지 존재 여부에 따라 결정
  //     },
  //     keepPreviousData: true,
  //     refetchOnWindowFocus: true,
  //   },
  // );

  // 커서 기반 페이징
  const infiniteQuery = useInfiniteQuery(
    ["portfolios", name, location, minPrice, maxPrice], // ✅ 동일한 쿼리 키 유지
    ({ pageParam = null }) =>
      getPortfolioListCursor(pageParam, name, location, minPrice, maxPrice), // ✅ 커서 기반 API 호출
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.nextCursor ?? undefined;
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
