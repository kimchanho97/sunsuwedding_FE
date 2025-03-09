import MainBestReviewItem from "./MainBestReviewItem";

const MainBestReview = () => {
  return (
    <div>
      <div className="ml-[12px] mt-[15px] text-lg font-semibold">
        BEST REVIEW
      </div>
      <MainBestReviewItem
        className="border-b border-lightgray-sunsu"
        src="images/1_6.webp"
        alt="김연아님의 리뷰 사진"
        plannerName="유희정"
        coupleName="김연아"
        content1="희정 플래너님은 상담에서 의견을 최대한 반영해주시고 친절하게 응대해주셔서 좋았어요. 조금 늦게 시작했다고 생각했는데 불안함을 다 잡아주시고 다양한 옵션 제시해주셔서 너무 좋았어요!💕"
        content2="플래너님께서 강추하신 곳에서 메이크업도 최고였고, 결혼 준비가 힘들줄만 알았는데 즐거웠어요. 희정 플래너님 추천합니다! 😍🌈"
      />
      <MainBestReviewItem
        src="images/2_6.webp"
        alt="박신혜님의 리뷰 사진"
        plannerName="김아름"
        coupleName="박신혜"
        content1="4월부터 아름 플래너님과 함께 했는데요. 블로그에서 추천 글을 보고 연락 드렸었어요! 상담하는데 취향 존중 해주시고 답변도 빨리 해주셔서 편안하게 진행했던 것 같아요.🌟"
        content2="플래너님께서 추천해주신 곳에서 예식을 하게 되었는데, 정말 예쁘고 아늑한 곳이었어요. 아름 플래너님과 함께해서 너무 행복했어요. 추천합니다! 🥰"
      />
    </div>
  );
};

export default MainBestReview;
