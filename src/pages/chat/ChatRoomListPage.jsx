import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChatListHeaderRow from "../../components/chat/ChatListHeaderRow";
import ChatRoomItem from "../../components/chat/ChatRoomItem";
import useFetchChatRooms from "../../hooks/useChatRoomList";
import Spinner from "../../components/common/atoms/Spinner";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";

export default function ChatRoomListPage() {
  const { userInfo } = useSelector((state) => state.user);
  const bottomObserverRef = useRef(null);
  const { defaultErrorHandler } = useDefaultErrorHandler();

  const {
    chatRooms,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFetchChatRooms(userInfo.userId);

  useEffect(() => {
    if (!bottomObserverRef.current || !hasNextPage || isFetchingNextPage)
      return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (bottomObserverRef.current && hasNextPage) {
      observer.observe(bottomObserverRef.current);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (error) {
      defaultErrorHandler(error);
    }
  }, [error]);

  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-col w-full h-full">
      <ChatListHeaderRow />
      {/* 채팅방 목록 */}
      {chatRooms?.map((chatRoom) => (
        <ChatRoomItem
          key={chatRoom.chatRoomCode}
          chatRoomCode={chatRoom.chatRoomCode}
          chatPartnerName={chatRoom.chatPartnerName}
          lastMessageAt={chatRoom.lastMessageAt}
          lastMessage={chatRoom.lastMessage}
          unreadCount={chatRoom.unreadCount}
          avatarUrl={chatRoom.avatarUrl}
        />
      ))}

      {/* 무한스크롤 감지용 ref */}
      <div ref={bottomObserverRef} className="h-1" />
    </div>
  );
}
