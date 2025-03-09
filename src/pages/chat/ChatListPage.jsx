import React from "react";
import ChatListHeaderRow from "../../components/chat/ChatListHeaderRow";

export default function ChatListPage() {
  // const [chatList, setChatList] = useState([]);
  // const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col w-full h-full">
      <ChatListHeaderRow />
      {/* 채팅 목록 영역 */}

      {/* {chatList?.map((message) => ( */}
      {/*  <div key={message.timestamp}> */}
      {/*    <ChatRoomItem */}
      {/*      timestamp={message.timestamp} */}
      {/*      counterName={message.counterName} */}
      {/*      lastMessage={message.lastMessage} */}
      {/*      chatId={message.chatId} */}
      {/*      unreadCount={message.unreadCount} */}
      {/*      avatar={message.avatar} */}
      {/*    /> */}
      {/*  </div> */}
      {/* ))} */}
    </div>
  );
}
