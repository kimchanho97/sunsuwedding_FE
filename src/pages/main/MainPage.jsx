import React, { useState } from "react";
import MainCarousel from "../../components/main/MainCarousel";
import MainHeaderRow from "../../components/main/MainHeaderRow";
import MainSearchBar from "../../components/main/MainSearchBar";
import Footer from "../../components/common/Footer";
import MainBestReview from "../../components/main/MainBestReview";

export default function MainPage() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const handleOpenSearchBar = () => {
    setIsSearchBarOpen(true);
  };
  const handleCloseSearchBar = () => {
    setIsSearchBarOpen(false);
  };

  return (
    <div className="flex w-full h-full flex-col">
      {isSearchBarOpen ? (
        <MainSearchBar handleCloseSearchBar={handleCloseSearchBar} />
      ) : (
        <MainHeaderRow handleOpenSearchBar={handleOpenSearchBar} />
      )}
      <MainCarousel />
      <MainBestReview />
      <Footer />
    </div>
  );
}
