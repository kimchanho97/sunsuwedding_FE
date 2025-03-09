import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import PortfolioReviewHeader from "../../components/review/PortfolioReviewHeader";

export default function PortfolioReviewPage() {
  return (
    <div className="w-full h-full">
      <PortfolioReviewHeader />
      {/* <PortfolioReviewTemplate /> */}
      <div className="flex justify-center w-full h-full">
        <div className="pt-10 flex flex-col items-center gap-5">
          <BsExclamationTriangle size={50} />
          <div className="flex flex-col items-center">
            <span className=" text-2xl font-bold">
              아직 작성된 리뷰가 없습니다.
            </span>
            <span>첫 번째 리뷰를 남겨보세요!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
