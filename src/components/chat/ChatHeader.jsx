import React from "react";
import BackButtonHeader from "../common/BackButtonHeader";
import { defaultAvatarUrl } from "../../utils/constants";

export default function ChatHeader({ isOnline, partnerName, avatarUrl }) {
  return (
    <BackButtonHeader>
      <div className="pl-10 flex items-center gap-2">
        <div className="relative">
          <img
            src={avatarUrl || defaultAvatarUrl}
            alt="avatar"
            className="w-[36px] h-[36px] object-cover object-center rounded-full "
          />
          <span
            className={`absolute w-[11px] h-[11px] rounded-full border-2 border-white 
                        bottom-[-1.5px] right-[-1.5px] z-10 
                        ${isOnline ? "bg-green-500" : "bg-red-500"}`}
          />
        </div>
        <span className="text-sm mr-auto">{partnerName}</span>
      </div>
    </BackButtonHeader>
  );
}
