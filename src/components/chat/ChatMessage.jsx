import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";

function ChatMessage({ message, isLast, scrollToBottom }) {
  const { userInfo } = useSelector((state) => state.user);
  const isSender = message.senderId === userInfo.userId;
  const unreadCount = 2 - (message.readBy?.length || 0);

  const handleImageLoad = () => {
    if (isLast && scrollToBottom) {
      scrollToBottom();
    }
  };

  return (
    <div className={`flex gap-1  ${isSender ? "flex-row-reverse" : ""}`}>
      {message.messageType === "IMAGE" ? (
        <img
          src={message.fileUrl}
          alt="이미지"
          className="max-w-[70%] max-h-[400px]"
          onLoad={handleImageLoad} // ✅ 이미지 로드 완료 후 scroll
        />
      ) : (
        <div
          className={`max-w-[70%] px-[14px] py-[10px] border border-lightgray-sunsu text-sm rounded-[20px] ${
            isSender
              ? "bg-blue-sunsu text-white rounded-tr-sm"
              : "rounded-tl-sm"
          } whitespace-pre-line`}
        >
          {message.content}
        </div>
      )}
      <div
        className={`self-end text-xs flex flex-col ${isSender ? "items-end" : ""}`}
      >
        {unreadCount !== 0 && <span className="text-zinc-500">1</span>}
        <span>{dayjs(message.createdAt).format("HH:mm")}</span>
      </div>
    </div>
  );
}

export default ChatMessage;
