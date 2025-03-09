import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../store/slices/userSlice";
import PaymentBottomSheet from "../common/bottomsheet/PaymentBottomSheet";
import DeleteAccountBottomSheet from "./DeleteAccountBottomSheet";
import DeletePortfolioBottomSheet from "./DeletePortfolioBottomSheet";
import MembershipBottomSheet from "./MembershipBottomSheet";
import ProfileImage from "./ProfileImage";
import ReviewSection from "./ReviewSection";
import PortfolioSection from "./PortfolioSection";
import { logout } from "../../apis/user";

export default function ProfileTemplate() {
  const { userInfo } = useSelector((state) => state.user);
  const [paymentBottomSheetOpen, setPaymentBottomSheetOpen] = useState(false);
  const [membershipBottomSheetOpen, setMembershipBottomSheetOpen] =
    useState(false);
  const [deleteAccountBottomSheetOpen, setDeleteAccountBottomSheetOpen] =
    useState(false);
  const [deletePortfolioBottomSheetOpen, setDeletePortfolioBottomSheetOpen] =
    useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout(); // 서버에 로그아웃 요청 보내기
    } catch (error) {
      console.error("로그아웃 실패:", error.message); // 서버 응답 실패 시 로그 출력
    } finally {
      dispatch(logOut()); // 클라이언트 상태 초기화 (세션 만료 시에도 실행)
    }
  };

  const handleOnShowPaymentBottomSheet = () => {
    if (userInfo.grade === "premium") {
      setMembershipBottomSheetOpen(true);
      return;
    }
    setPaymentBottomSheetOpen(true);
  };

  return (
    <div className="relative w-full h-full ">
      {paymentBottomSheetOpen && (
        <PaymentBottomSheet onClose={() => setPaymentBottomSheetOpen(false)} />
      )}
      {membershipBottomSheetOpen && (
        <MembershipBottomSheet
          onClose={() => setMembershipBottomSheetOpen(false)}
        />
      )}
      {deleteAccountBottomSheetOpen && (
        <DeleteAccountBottomSheet
          onClose={() => setDeleteAccountBottomSheetOpen(false)}
        />
      )}
      {deletePortfolioBottomSheetOpen && (
        <DeletePortfolioBottomSheet
          onClose={() => setDeletePortfolioBottomSheetOpen(false)}
        />
      )}
      <div className="flex flex-col w-full h-full relative pl-[35px]">
        {/* 유저 정보 영역 */}
        <div className="flex pt-[50px] justify-between pr-[50px] pb-[25px]">
          <div className="flex flex-col ">
            <span className="text-xl">안녕하세요</span>
            <span className="text-xl">
              <span className="font-bold text-blue-sunsu">
                {userInfo.username}
              </span>
              님
            </span>
            <span className="pt-[5px] text-xs tracking-tight">
              {userInfo.email}
            </span>
          </div>
          <ProfileImage />
        </div>
        {/* 결제 영역 */}
        <div className="flex flex-col text-base pt-[15px]">
          <span className="pb-[5px] text-skyblue-sunsu">서비스</span>
          <Link
            className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
            to="/profile/favorites"
          >
            찜한 플래너 모아보기
          </Link>
          <Link
            className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
            to="/quotations/collect"
          >
            견적서 모아보기
          </Link>
          {userInfo.role === "planner" ? (
            <PortfolioSection
              setDeletePortfolioBottomSheetOpen={
                setDeletePortfolioBottomSheetOpen
              }
            />
          ) : (
            <ReviewSection />
          )}
          <button
            className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
            onClick={handleOnShowPaymentBottomSheet}
          >
            순수 멤버십
          </button>
        </div>
        {/* 로그아웃 & 회원탈퇴 */}
        <div className="flex flex-col text-base pt-[15px] pb-[10px]">
          <span className="pb-[5px] text-skyblue-sunsu">회원정보</span>
          <button
            className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
            onClick={handleLogout}
          >
            로그아웃
          </button>
          <button
            className="w-fit pt-[5px] pb-[5px] text-lg hover:underline"
            onClick={() => setDeleteAccountBottomSheetOpen(true)}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
