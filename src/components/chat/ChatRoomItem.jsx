import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import Photo from "../common/atoms/Photo";
import { defaultAvatarUrl } from "../../utils/constants";

export default function ChatRoomItem({
  chatRoomCode,
  chatPartnerName,
  lastMessageAt,
  lastMessage,
  unreadCount,
  avatarUrl,
}) {
  const MIN_DATE = "-999999999-01-01T00:00:00";

  return (
    <Link
      className=" block px-[29px] pt-[15px] pb-[20px] w-full hover:bg-zinc-100"
      to={`/chat/rooms/${chatRoomCode}`}
    >
      <div className="flex items-center w-full gap-2">
        <Photo
          src={avatarUrl || defaultAvatarUrl}
          alt={`${chatPartnerName}님의 프로필 사진`}
          className="w-12 h-12 object-cover object-center rounded-2xl shrink-0"
        />
        <div className="flex flex-col grow">
          <div className="flex justify-between w-full">
            <span className="text-base font-bold">{chatPartnerName}</span>
            <span className="text-sm text-zinc-500">
              {lastMessageAt === MIN_DATE
                ? "-"
                : dayjs(lastMessageAt).format("YYYY.MM.DD")}
            </span>
          </div>
          <div className="flex justify-between w-full">
            <span className="mr-1 text-left line-clamp-2 leading-tight text-sm">
              {lastMessage}
            </span>
            {unreadCount > 0 && (
              <span className="self-start px-2 text-xs text-white bg-red-500 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
