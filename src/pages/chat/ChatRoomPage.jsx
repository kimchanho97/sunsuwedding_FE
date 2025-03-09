import React, { useRef } from "react";
import ChatInput from "../../components/chat/ChatInput";

export default function ChatRoomPage() {
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

  // 초기 레이아웃 조정
  adjustLayout();

  // 3. 메세지가 추가될 때마다 스크롤 내리기
  // useEffect(() => {
  //   messageEndRef.current?.scrollIntoView({ behavior: "auto" });
  // }, [messages.length]);

  // if (isLoading) return <Spinner />;

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
        <ChatInput />
      </div>
    </div>
  );
}
