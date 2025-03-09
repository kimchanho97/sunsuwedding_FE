import React from "react";
import NoWritableReview from "../../components/review/NoWritableReview";
import WritableReviewHeader from "../../components/review/WritableReviewHeader";

export default function WritableReviewListPage() {
  // const { defaultErrorHandler } = useDefaultErrorHandler();
  // const { data, isLoading } = useQuery(["/reviews/writable"], getMatchReviews, {
  //   onError: (error) => {
  //     defaultErrorHandler(error);
  //   },
  // });

  // if (isLoading) return <Spinner />;
  return (
    <div className="w-full h-full">
      <WritableReviewHeader />
      <NoWritableReview />
      {/* {data?.matches?.length === 0 ? ( */}
      {/*  <NoWritableReview /> */}
      {/* ) : ( */}
      {/*  <WritableReviewTemplate matches={data.matches} /> */}
      {/* )} */}
    </div>
  );
}
