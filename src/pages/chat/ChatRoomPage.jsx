import React, { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import ChatInput from "../../components/chat/ChatInput";

export default function ChatRoomPage() {
  const { chatRoomId } = useParams();
  const stompClientRef = useRef(null);
  // const { userInfo } = useSelector((state) => state.user);
  // const { chatId } = useParams();
  const messageEndRef = useRef(null);
  // const prevDate = null;

  const viewport = window.visualViewport;
  function adjustLayout() {
    const viewportHeight = viewport.height;
    window.innerHeight = viewportHeight;
  }
  viewport.addEventListener("resize", adjustLayout);
  adjustLayout();

  // 3. 메세지가 추가될 때마다 스크롤 내리기
  // useEffect(() => {
  //   messageEndRef.current?.scrollIntoView({ behavior: "auto" });
  // }, [messages.length]);

  // if (isLoading) return <Spinner />;

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("🟢 STOMP 연결 성공");
        client.subscribe(`/topic/chat/room/${chatRoomId}`, (message) => {
          const received = JSON.parse(message.body);
          console.log("✅ 수신 메시지:", received);
          // 메시지 목록에 추가 등
        });
      },
    });

    stompClientRef.current = client;
    client.activate();

    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, [chatRoomId]);

  return (
    <div className="flex flex-col w-full h-full">
      {/* 헤더 */}
      {/* <ChatHeader counterName={counterName} chatId={chatId} /> */}
      {/* 메세지 영역 */}
      <div className="px-[12px] pt-3 flex flex-col gap-[8px] relative mb-[80px]">
        {/* {messages?.map((message) => { */}
        {/*  if (prevDate !== convertToDate(message.timestamp)) { */}
        {/*    prevDate = convertToDate(message.timestamp); */}
        {/*    return ( */}
        {/*      <React.Fragment key={message.timestamp}> */}
        {/*        <DateSeperationLine date={prevDate} /> */}
        {/*        <ChatMessage */}
        {/*          message={message} */}
        {/*          isSender={message.user.userId === userInfo.userId} */}
        {/*          counterAvatar={counterAvatar} */}
        {/*        /> */}
        {/*      </React.Fragment> */}
        {/*    ); */}
        {/*  } */}
        {/*  return ( */}
        {/*    <ChatMessage */}
        {/*      key={message.timestamp} */}
        {/*      message={message} */}
        {/*      isSender={message.user.userId === userInfo.userId} */}
        {/*      counterAvatar={counterAvatar} */}
        {/*    /> */}
        {/*  ); */}
        {/* })} */}
        <div ref={messageEndRef} />
      </div>
      {/* 메세지 입력창 */}
      <div className=" w-full z-10 bg-white fixed bottom-10 max-w-[576px]">
        <ChatInput stompClient={stompClientRef.current} />
      </div>
    </div>
  );
}
