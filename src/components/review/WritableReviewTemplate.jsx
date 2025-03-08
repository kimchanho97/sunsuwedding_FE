import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Photo from "../common/atoms/Photo";

export default function WritableReviewTemplate({ matches }) {
  return (
    <div className="w-full h-full p-5 flex flex-col gap-3">
      {matches.map((match) => (
        <Link
          className="flex gap-2 hover:bg-zinc-100 w-full hover:rounded-[10px] p-2 border-b"
          to={`/profile/reviews/create/${
            match.chatId
          }?plannerName=${encodeURIComponent(match.plannerName)}`}
          key={match.plannerId}
        >
          <Photo
            alt="avatar"
            className="w-12 h-12 object-cover object-center rounded-2xl shrink-0"
          />
          <div className="w-full flex flex-col tracking-tight justify-between">
            <div className="flex justify-between w-full">
              <span className="font-bold">{match.plannerName} 플래너</span>
              <span className="text-[10px]">
                확정 일자: {match.confirmedAt}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="underline font-semibold text-sm">
                리뷰 작성하러 가기
              </span>
              <AiOutlineDoubleRight size={16} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
