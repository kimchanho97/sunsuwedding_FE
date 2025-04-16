import dayjs from "dayjs";
import React from "react";

function ChatMessage({ message, isSender }) {
  return (
    <div className={`flex gap-1  ${isSender ? "flex-row-reverse" : ""}`}>
      {message.messageType === "IMAGE" ? (
        <img
          src={message.content}
          alt="이미지"
          className="max-w-[70%] max-h-[400px]"
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
        {/* <span className="text-zinc-500">{message.isRead ? "" : 1}</span> */}
        <span>{dayjs(message.createdAt).format("HH:mm")}</span>
      </div>
    </div>
  );
}

export default ChatMessage;
