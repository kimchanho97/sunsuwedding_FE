import { useEffect, useRef } from "react";
import useFetchFavorites from "../../hooks/useFetchFavorites";
import Container from "../common/atoms/Container";
import Spinner from "../common/atoms/Spinner";
import NoFavoriteList from "./NoFavoriteList";
import FavoritePortfolioGrid from "./FavoritePortfolioGrid";

const FavoriteListTemplate = () => {
  const bottomObserver = useRef(null);
  const {
    isFetchingNextPage, // 다음 페이지를 가져오는 요청이 진행 중인지 여부
    hasNextPage,
    isLoading,
    isFetching,
    fetchNextPage,
    favorites,
    setFavorites,
  } = useFetchFavorites();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    if (bottomObserver.current && hasNextPage) {
      io.observe(bottomObserver.current);
    }
    return () => {
      io.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <Spinner />;
  return (
    <>
      <Container>
        {!isFetching && favorites?.length === 0 ? (
          <NoFavoriteList />
        ) : (
          <FavoritePortfolioGrid
            portfolios={favorites}
            isFetchingNextPage={isFetchingNextPage}
            setFavorites={setFavorites}
          />
        )}
      </Container>
      <div ref={bottomObserver} />
    </>
  );
};

export default FavoriteListTemplate;
