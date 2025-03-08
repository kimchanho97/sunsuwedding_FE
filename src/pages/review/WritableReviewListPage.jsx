import React from "react";
import { useQuery } from "react-query";
import { getMatchReviews } from "../../apis/review";
import Spinner from "../../components/common/atoms/Spinner";
import NoWritableReview from "../../components/review/NoWritableReview";
import WritableReviewHeader from "../../components/review/WritableReviewHeader";
import WritableReviewTemplate from "../../components/review/WritableReviewTemplate";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";

export default function WritableReviewListPage() {
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const { data, isLoading } = useQuery(["/reviews/writable"], getMatchReviews, {
    onError: (error) => {
      defaultErrorHandler(error);
    },
  });

  if (isLoading) return <Spinner />;
  return (
    <div className="w-full h-full">
      <WritableReviewHeader />
      {data?.matches?.length === 0 ? (
        <NoWritableReview />
      ) : (
        <WritableReviewTemplate matches={data.matches} />
      )}
    </div>
  );
}
