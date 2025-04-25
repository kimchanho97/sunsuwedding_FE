import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as StarIcon } from "../../assets/star-02.svg";
import useOpenBottomSheet from "../../hooks/useOpenBottomSheet";
import Button from "../common/atoms/Button";
import DivideBar from "../common/atoms/DivideBar";
import PaymentBottomSheet from "../common/bottomsheet/PaymentBottomSheet";
import DescriptionRow from "./DescriptionRow";
import FavoriteButton from "./FavoriteButton";
import HistoryBottomSheet from "./HistoryBottomSheet";
import MembershipPaySection from "./MembershipPaySection";
import PlannerInfoRow from "./PlannerInfoRow";
import PortfolioCarousel from "./PortfolioCarousel";
import ChatConfirmBottomSheet from "./ChatConfirmBottomSheet";
import PaymentsHistorySection from "./PaymentsHistorySection";

const PortfolioDetailTemplate = ({ portfolio }) => {
  const { isLogged, userInfo } = useSelector((state) => state.user);
  const [paymentBottomSheetOpen, setPaymentBottomSheetOpen] = useState(false);
  const [historyBottomSheetOpen, setHistoryBottomSheetOpen] = useState(false);
  const [chatConfirmOpen, setChatConfirmOpen] = useState(false);
  const { openBottomSheetHandler } = useOpenBottomSheet();

  const handleOpenPaymentBottomSheet = () => {
    if (!isLogged) {
      openBottomSheetHandler({ bottomSheet: "loginBottomSheet" });
      return;
    }
    setPaymentBottomSheetOpen(true);
  };

  const handleOpenChatConfirmBottomSheet = () => {
    if (!isLogged) {
      openBottomSheetHandler({ bottomSheet: "loginBottomSheet" });
      return;
    }
    setChatConfirmOpen(true);
  };

  return (
    <div className="w-full h-full relative">
      {paymentBottomSheetOpen && (
        <PaymentBottomSheet onClose={() => setPaymentBottomSheetOpen(false)} />
      )}
      {historyBottomSheetOpen && (
        <HistoryBottomSheet onClose={() => setHistoryBottomSheetOpen(false)} />
      )}
      {chatConfirmOpen && (
        <ChatConfirmBottomSheet
          plannerName={portfolio.plannerName}
          plannerId={portfolio.plannerId}
          onClose={() => setChatConfirmOpen(false)}
        />
      )}
      <div>
        <PortfolioCarousel portfolio={portfolio} />
      </div>
      {/* 플래너 정보 */}
      <PlannerInfoRow
        plannerName={portfolio.plannerName}
        contractCount={portfolio.contractedCount}
        location={portfolio.location}
        title={portfolio.title}
        totalPrice={portfolio.totalPrice}
        items={portfolio.items}
      />
      {/* 찜하기 & 리뷰 */}
      <div className=" flex w-full border-t items-center">
        <div className="h-[50px] w-1/2 border-r flex justify-center">
          <FavoriteButton isFavorited={portfolio.isFavorited} />
        </div>
        <div className="h-[50px] w-1/2 flex items-center justify-center">
          <Link to={`/portfolios/reviews/${portfolio.plannerId}`}>
            <div className="flex gap-[10px] items-center">
              <span className="font-bold">리뷰</span>
              <div className="flex gap-1 items-center">
                <StarIcon className="w-[16px] h-[16px] object-cover mb-[1px]" />
                <div className="text-base align-middle font-bold">
                  {portfolio.averageRating.toFixed(1)}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* 플래너 소개 */}
      <DivideBar />
      <DescriptionRow title="소개" detail={portfolio.description} />
      <DivideBar />
      <DescriptionRow title="경력" detail={portfolio.career} />
      <DivideBar />
      <DescriptionRow
        title="주요 제휴 업체"
        detail={portfolio.partnerCompany}
      />
      <DivideBar />
      <div className="justify-between p-5">
        <div className="text-base font-bold">
          <span>이전 매칭 내역 </span>
          <span className="text-xs font-semibold text-zinc-400">
            (샘플 데이터입니다)
          </span>
        </div>
        <div className="pt-5">
          {userInfo.grade === "premium" ? (
            <PaymentsHistorySection
              setHistoryBottomSheetOpen={setHistoryBottomSheetOpen}
            />
          ) : (
            <MembershipPaySection
              handleOpenPaymentBottomSheet={handleOpenPaymentBottomSheet}
            />
          )}
        </div>
      </div>
      {!(userInfo.role === "planner") && (
        <Button
          className="w-full h-[50px] mt-3 flex items-center justify-center bg-lightskyblue-sunsu text-sm"
          onClick={handleOpenChatConfirmBottomSheet}
        >
          <span>채팅 상담 받기</span>
        </Button>
      )}
    </div>
  );
};

export default PortfolioDetailTemplate;
