import React from "react";
import NoReviewList from "../../components/review/NoReviewList";
import ReviewListHeader from "../../components/review/ReviewListHeader";

export default function ReviewListPage() {
  // const { defaultErrorHandler } = useDefaultErrorHandler();
  // const { data, isLoading } = useQuery(["/reviews/all"], getReviewsListSelf, {
  //   onError: (error) => {
  //     defaultErrorHandler(error);
  //   },
  // });

  // if (isLoading) return <Spinner />;
  return (
    <div className="w-full h-full">
      <ReviewListHeader />
      <NoReviewList />
      {/* {data?.reviews?.length === 0 ? ( */}
      {/*  <NoReviewList /> */}
      {/* ) : ( */}
      {/*  <ReviewListTemplate reviews={data.reviews} /> */}
      {/* )} */}
    </div>
  );
}
