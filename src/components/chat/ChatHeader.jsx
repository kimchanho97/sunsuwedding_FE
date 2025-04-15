import React from "react";
import BackButtonHeader from "../common/BackButtonHeader";

export default function ChatHeader({ otherUserName, avatarUrl }) {
  const isOnline = true; // Placeholder for online status

  // 나의 접속 상태 관리
  // 상태방의 접속 상태 조회

  return (
    <BackButtonHeader>
      <div className="pl-10 flex items-center gap-2">
        <div className="relative">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-[36px] h-[36px] object-cover object-center rounded-full "
          />
          <span
            className={`absolute w-[11px] h-[11px] rounded-full border-2 border-white 
                        bottom-[-1.5px] right-[-1.5px] z-10 
                        ${isOnline ? "bg-green-500" : "bg-red-500"}`}
          />
        </div>
        <span className="text-sm mr-auto">{otherUserName}</span>
      </div>
    </BackButtonHeader>
  );
}
