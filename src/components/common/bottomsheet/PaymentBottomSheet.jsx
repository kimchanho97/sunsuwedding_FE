import { loadTossPayments } from "@tosspayments/payment-sdk";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { savePayment } from "../../../apis/payments";
import useDefaultErrorHandler from "../../../hooks/useDefaultErrorHandler";
import { sunsuMembershipPrice } from "../../../utils/constants";
import { comma } from "../../../utils/convert";
import Button from "../atoms/Button";
import BottomSheet from "./BottomSheet";

export default function PaymentBottomSheet({ onClose }) {
  const { userInfo } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const tossPaymentsRef = useRef(null);
  const { defaultErrorHandler } = useDefaultErrorHandler();

  const handleOnPayment = async () => {
    try {
      setIsLoading(true);

      // 결제 정보를 저장하고, 결제 금액과 주문 ID를 받아옴
      const paymentData = await savePayment();

      const tosspayments = await loadTossPayments(
        process.env.REACT_APP_TOSS_CLIENT_KEY,
      );
      tossPaymentsRef.current = tosspayments;

      await tosspayments.requestPayment("카드", {
        amount: paymentData.amount,
        orderId: paymentData.orderId,
        orderName: "순수 멤버십",
        successUrl: `${window.location.origin}/payments/complete`,
        failUrl: `${window.location.origin}/payments/fail`,
        customerName: userInfo.username,
      });
    } catch (error) {
      defaultErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  // page 전환시 iframe이 남아있는 문제 해결
  useEffect(() => {
    return () => {
      tossPaymentsRef?.current?.cancelPayment();
    };
  }, [tossPaymentsRef]);

  return (
    <BottomSheet onClose={onClose}>
      <div>
        <div className="flex flex-col tracking-tight font-bold text-lg">
          <span>한 번만 결제하면</span>
          <span>모든 웨딩플래너의 매칭 내역 열람 가능</span>
        </div>
        <div className="text-xs text-gray-sunsu pt-[5px]">
          단, 예비 신랑신부 회원은 결혼 과정이 끝나는 시점에 멤버십이 자동
          해지됩니다.
        </div>
        <div className="py-5 text-lg">
          <span className="font-bold">{comma(sunsuMembershipPrice)}원</span>
          <span>에 순수 멤버십을 이용해보세요.</span>
        </div>
        <Button
          className="block w-full h-[50px] rounded-[10px] text-sm bg-lightskyblue-sunsu"
          onClick={() => {
            handleOnPayment();
          }}
          disabled={isLoading}
        >
          결제하기
        </Button>
      </div>
    </BottomSheet>
  );
}
