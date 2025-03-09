import React from "react";
import MainCarousel from "../../components/main/MainCarousel";
import Footer from "../../components/common/Footer";
import MainBestReview from "../../components/main/MainBestReview";
import MainHeaderRow from "../../components/main/MainHeaderRow";

export default function MainPage() {
  return (
    <div className="flex w-full h-full flex-col">
      <MainHeaderRow />
      <MainCarousel />
      <MainBestReview />
      <Footer />
    </div>
  );
}
