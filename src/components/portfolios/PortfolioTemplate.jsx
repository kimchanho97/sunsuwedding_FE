import { useEffect, useRef, useState } from "react";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";
import useFetchPortfolios from "../../hooks/useFetchPortfolios";
import SearchBar from "../common/SearchBar";
import Container from "../common/atoms/Container";
import Spinner from "../common/atoms/Spinner";
import EmptySearchResult from "./EmptySearchResult";
import FilterForm from "./FilterForm";
import PortfolioGrid from "./PortfolioGrid";
import SearchHeaderRow from "./SearchHeaderRow";

const PortfolioTemplate = () => {
  const bottomObserver = useRef(null);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isFilterFormOpen, setIsFilterFormOpen] = useState(false);
  const { defaultErrorHandler } = useDefaultErrorHandler();

  const [name, setName] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [prices, setPrices] = useState([0, 10_000_000]);

  const [queryName, setQueryName] = useState(null);
  const [queryLocation, setQueryLocation] = useState(null);
  const [queryMinPrice, setQueryMinPrice] = useState(null);
  const [queryMaxPrice, setQueryMaxPrice] = useState(null);

  const {
    isFetchingNextPage, // 다음 페이지를 가져오는 요청이 진행 중인지 여부
    error,
    hasNextPage,
    isLoading,
    fetchNextPage,
    portfolios,
  } = useFetchPortfolios({
    name: queryName,
    location: queryLocation,
    minPrice: queryMinPrice,
    maxPrice: queryMaxPrice,
  });

  const handleOpenSearchBar = () => {
    if (isFilterFormOpen) {
      setIsFilterFormOpen(false);
    }
    setIsSearchBarOpen(true);
  };
  const handleCloseSearchBar = () => {
    setIsSearchBarOpen(false);
  };
  const handleFilterForm = () => {
    setIsFilterFormOpen((prev) => !prev);
  };

  const onKeyDownEnter = (e) => {
    // 한글만 두 번 입력되는 문제가 발생 -> 한글은 자음과 모음의 조합으로 한 음절이 만들어지기 때문에 조합문자이고, 영어는 조합문자가 아니다.
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      setQueryName(name);
      handleCloseSearchBar();
    }
  };

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

  useEffect(() => {
    if (error) {
      defaultErrorHandler(error);
    }
  }, [error]);

  if (isLoading) return <Spinner />;

  return (
    <>
      {isSearchBarOpen && (
        <SearchBar
          handleCloseSearchBar={handleCloseSearchBar}
          name={name}
          setName={setName}
          onKeyDownEnter={onKeyDownEnter}
        />
      )}
      {!isSearchBarOpen && (
        <SearchHeaderRow
          handleOpenSearchBar={handleOpenSearchBar}
          isFilterFormOpen={isFilterFormOpen}
          handleFilterForm={handleFilterForm}
        />
      )}
      {isFilterFormOpen && (
        <FilterForm
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          prices={prices}
          setPrices={setPrices}
          handleFilterForm={handleFilterForm}
          setQueryLocation={setQueryLocation}
          setQueryMinPrice={setQueryMinPrice}
          setQueryMaxPrice={setQueryMaxPrice}
        />
      )}
      <Container>
        {portfolios?.length === 0 ? (
          <EmptySearchResult />
        ) : (
          <PortfolioGrid
            portfolios={portfolios}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </Container>
      <div ref={bottomObserver} />
    </>
  );
};

export default PortfolioTemplate;
