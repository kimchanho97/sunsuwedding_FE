import React from "react";
import BackButtonHeader from "../common/BackButtonHeader";

export default function ChatHeader() {
  return (
    <BackButtonHeader>
      <>
        <span className="text-sm pl-10 mr-auto">홍길동</span>
        <span className="text-sm pr-[15px] text-blue-sunsu font-medium">
          ㅁ
        </span>
      </>
    </BackButtonHeader>
  );
}
