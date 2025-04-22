import React from "react";
import { useSetAtom } from "jotai";
import { paymentAtom } from "../../store";
import { comma } from "../../utils/convert";
import { ReactComponent as RightArrow } from "../../assets/right-01.svg";
import Button from "../common/atoms/Button";

// done test
export default function PaymentHistorySection({ setHistoryBottomSheetOpen }) {
  const setPayment = useSetAtom(paymentAtom);
  const paymentsHistory = {
    avgPrice: 2380000,
    minPrice: 1800000,
    maxPrice: 3200000,
    payments: [
      {
        price: 3200000,
        confirmedAt: "2024.11",
        paymentItems: [
          {
            paymentTitle: "스튜디오",
            paymentPrice: 1200000,
            paymentCompany: "릴스튜디오",
            paymentDescription: "원스톱 원데이 촬영",
          },
          {
            paymentTitle: "홀대관",
            paymentPrice: 1000000,
            paymentCompany: "그랜드홀",
            paymentDescription: "고급 연회장 대관",
          },
          {
            paymentTitle: "드레스",
            paymentPrice: 500000,
            paymentCompany: "올웨딩",
            paymentDescription: "촬영+본식, 드레스 3벌",
          },
          {
            paymentTitle: "헤어/메이크업",
            paymentPrice: 500000,
            paymentCompany: "에브뉴청담",
            paymentDescription: "원장 시술",
          },
        ],
      },
      {
        price: 2300000,
        confirmedAt: "2024.10",
        paymentItems: [
          {
            paymentTitle: "스튜디오",
            paymentPrice: 1000000,
            paymentCompany: "메리플랜",
            paymentDescription: "프리미엄 원데이 촬영",
          },
          {
            paymentTitle: "드레스",
            paymentPrice: 900000,
            paymentCompany: "르셀린",
            paymentDescription: "촬영 전용 2벌",
          },
          {
            paymentTitle: "헤어/메이크업",
            paymentPrice: 400000,
            paymentCompany: "웨딩벨",
            paymentDescription: "메이크업 & 스타일링",
          },
        ],
      },
      {
        price: 2400000,
        confirmedAt: "2024.09",
        paymentItems: [
          {
            paymentTitle: "스튜디오",
            paymentPrice: 1100000,
            paymentCompany: "릴스튜디오",
            paymentDescription: "원본+보정 포함",
          },
          {
            paymentTitle: "드레스",
            paymentPrice: 900000,
            paymentCompany: "올웨딩",
            paymentDescription: "본식+촬영, 드레스 4벌",
          },
          {
            paymentTitle: "헤어/메이크업",
            paymentPrice: 400000,
            paymentCompany: "에브뉴청담",
            paymentDescription: "원장 시술",
          },
        ],
      },
      {
        price: 2350000,
        confirmedAt: "2024.08",
        paymentItems: [
          {
            paymentTitle: "스튜디오",
            paymentPrice: 1050000,
            paymentCompany: "메리플랜",
            paymentDescription: "원데이 스냅 촬영",
          },
          {
            paymentTitle: "드레스",
            paymentPrice: 900000,
            paymentCompany: "르셀린",
            paymentDescription: "촬영 전용 3벌",
          },
          {
            paymentTitle: "헤어/메이크업",
            paymentPrice: 400000,
            paymentCompany: "웨딩벨",
            paymentDescription: "메이크업 서비스",
          },
        ],
      },
      {
        price: 2340000,
        confirmedAt: "2024.07",
        paymentItems: [
          {
            paymentTitle: "스튜디오",
            paymentPrice: 1000000,
            paymentCompany: "릴스튜디오",
            paymentDescription: "원본 포함 원데이 촬영",
          },
          {
            paymentTitle: "드레스",
            paymentPrice: 940000,
            paymentCompany: "올웨딩",
            paymentDescription: "본식 드레스 2벌",
          },
          {
            paymentTitle: "헤어/메이크업",
            paymentPrice: 400000,
            paymentCompany: "에브뉴청담",
            paymentDescription: "촬영 메이크업",
          },
        ],
      },
      {
        price: 2360000,
        confirmedAt: "2024.06",
        paymentItems: [
          {
            paymentTitle: "스튜디오",
            paymentPrice: 1140000,
            paymentCompany: "메리플랜",
            paymentDescription: "프리미엄 촬영",
          },
          {
            paymentTitle: "드레스",
            paymentPrice: 860000,
            paymentCompany: "르셀린",
            paymentDescription: "촬영 전용 3벌",
          },
          {
            paymentTitle: "헤어/메이크업",
            paymentPrice: 360000,
            paymentCompany: "웨딩벨",
            paymentDescription: "메이크업 & 헤어",
          },
        ],
      },
      {
        price: 2330000,
        confirmedAt: "2024.05",
        paymentItems: [
          {
            paymentTitle: "스튜디오",
            paymentPrice: 1000000,
            paymentCompany: "릴스튜디오",
            paymentDescription: "스냅 촬영",
          },
          {
            paymentTitle: "드레스",
            paymentPrice: 930000,
            paymentCompany: "올웨딩",
            paymentDescription: "촬영 전용 2벌",
          },
          {
            paymentTitle: "헤어/메이크업",
            paymentPrice: 400000,
            paymentCompany: "에브뉴청담",
            paymentDescription: "촬영 메이크업",
          },
        ],
      },
      {
        price: 2370000,
        confirmedAt: "2024.04",
        paymentItems: [
          {
            paymentTitle: "스튜디오",
            paymentPrice: 1100000,
            paymentCompany: "메리플랜",
            paymentDescription: "원본+보정 포함",
          },
          {
            paymentTitle: "드레스",
            paymentPrice: 870000,
            paymentCompany: "르셀린",
            paymentDescription: "촬영 전용 3벌",
          },
          {
            paymentTitle: "헤어/메이크업",
            paymentPrice: 400000,
            paymentCompany: "웨딩벨",
            paymentDescription: "메이크업 서비스",
          },
        ],
      },
      {
        price: 2350000,
        confirmedAt: "2024.03",
        paymentItems: [
          {
            paymentTitle: "스튜디오",
            paymentPrice: 1050000,
            paymentCompany: "릴스튜디오",
            paymentDescription: "원데이 촬영",
          },
          {
            paymentTitle: "드레스",
            paymentPrice: 900000,
            paymentCompany: "올웨딩",
            paymentDescription: "드레스 2벌",
          },
          {
            paymentTitle: "헤어/메이크업",
            paymentPrice: 400000,
            paymentCompany: "에브뉴청담",
            paymentDescription: "메이크업",
          },
        ],
      },
      {
        price: 1800000,
        confirmedAt: "2024.02",
        paymentItems: [
          {
            paymentTitle: "스튜디오",
            paymentPrice: 800000,
            paymentCompany: "릴스튜디오",
            paymentDescription: "스냅 촬영",
          },
          {
            paymentTitle: "드레스",
            paymentPrice: 700000,
            paymentCompany: "르셀린",
            paymentDescription: "촬영 전용 1벌",
          },
          {
            paymentTitle: "헤어/메이크업",
            paymentPrice: 300000,
            paymentCompany: "에브뉴청담",
            paymentDescription: "촬영 메이크업",
          },
        ],
      },
    ],
  };

  return (
    <>
      <div className="flex h-[80px] pb-5 border-b">
        <div className="flex flex-col float-left w-[45%] items-center justify-center border-r border-lightgray-sunsu">
          <div className="text-lg">
            <em className="font-bold not-italic">
              {comma(paymentsHistory.avgPrice)}
            </em>
            원
          </div>
          <div className="text-sm text-gray-sunsu">평균</div>
        </div>
        <div className="flex flex-col float-right w-[55%] items-center justify-center">
          <div className="flex items-center pb-[5px] border-b border-lightgray-sunsu">
            <span className="mr-2.5 text-sm text-gray-sunsu">최대</span>
            <span className="text-lg">
              <em className="font-bold not-italic">
                {comma(paymentsHistory.maxPrice)}
              </em>
              원
            </span>
          </div>
          <div className="flex items-center pt-[5px]">
            <span className="mr-2.5 text-sm text-gray-sunsu">최소</span>
            <span className="text-lg">
              <em className="font-bold not-italic">
                {comma(paymentsHistory.minPrice)}
              </em>
              원
            </span>
          </div>
        </div>
      </div>
      <div>
        {paymentsHistory.payments?.map((payment, idx) => (
          <Button
            onClick={() => {
              setPayment(payment);
              setHistoryBottomSheetOpen(true);
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className="block w-full mt-3"
          >
            <div className="flex text-sm items-center">
              <div className="inline text-gray-sunsu pl-2.5">
                {payment.confirmedAt}
              </div>
              <div className="inline ml-auto">
                <em className="font-bold not-italic">{comma(payment.price)}</em>
                원
              </div>
              <div className="inline mx-2.5">
                <RightArrow />
              </div>
            </div>
          </Button>
        ))}
      </div>
    </>
  );
}
