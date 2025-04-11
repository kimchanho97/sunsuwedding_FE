import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatInput from "../../components/chat/ChatInput";
import useChatMessages from "../../hooks/useChatMessages";
import Spinner from "../../components/common/atoms/Spinner";
import { convertToDate } from "../../utils/convert";
import ChatMessage from "../../components/chat/ChatMessage";
import DateSeperationLine from "../../components/chat/DateSeperationLine";

export default function ChatRoomPage() {
  const { chatRoomId } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useChatMessages(chatRoomId);

  const [stompClient, setStompClient] = useState(null);
  const [newMessages, setNewMessages] = useState([]);

  // 메시지 배열은 서버에서 받아온 데이터는 reverse 후, 새 메시지(실시간)를 추가하는 형태
  const messages = useMemo(() => {
    const fetched = data?.pages.flatMap((page) => page.data).reverse() || [];
    return [...fetched, ...newMessages];
  }, [data, newMessages]);

  const scrollRef = useRef(null);
  const topObserverRef = useRef(null);
  const messageEndRef = useRef(null);

  const [prevScrollHeight, setPrevScrollHeight] = useState(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);

  const scrollToBottom = useCallback(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  // 최초 로딩 시 스크롤 하단 이동 (최신 메시지 보여줌)
  useEffect(() => {
    if (!initialScrollDone && messages.length > 0) {
      scrollToBottom();
      setInitialScrollDone(true);
    }
  }, [messages.length, initialScrollDone, scrollToBottom]);

  // 실시간 새 메시지 수신 시 하단으로 스크롤
  useEffect(() => {
    if (newMessages.length > 0) {
      scrollToBottom();
    }
  }, [newMessages, scrollToBottom]);

  // ✅ (중요) 화면이 클 때 자동 추가 페칭: "while" 방식 혹은 재귀 방식
  useEffect(() => {
    function fillScreenIfNeeded(attempts = 0) {
      if (!scrollRef.current) return;
      if (attempts > 5) return; // 무한 루프 방지용 (필요 시 조절)

      const container = scrollRef.current;
      const { scrollHeight, clientHeight } = container;
      // 아직 화면을 못 채웠고, 더 가져올 데이터가 있으며, 추가 요청 중이 아니라면
      if (
        scrollHeight <= clientHeight &&
        hasNextPage &&
        !isFetchingNextPage &&
        !isPaginating
      ) {
        setPrevScrollHeight(scrollHeight);
        setIsPaginating(true);
        fetchNextPage()
          .then(() => {
            // fetch가 끝난 뒤 다시 한 번 화면이 채워졌는지 재확인
            requestAnimationFrame(() => {
              setIsPaginating(false);
              fillScreenIfNeeded(attempts + 1);
            });
          })
          .catch(() => setIsPaginating(false));
      }
    }
    fillScreenIfNeeded();
  }, [messages, hasNextPage, isFetchingNextPage, isPaginating, fetchNextPage]);

  // 상단에 위치한 요소에 IntersectionObserver를 연결하여 이전 페이지 페칭
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // 요청 중이거나 더 이상 데이터가 없으면 반환
        if (
          entry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !isPaginating
        ) {
          // 스크롤 페이징 시작 전 현재 scrollHeight 저장
          const currentHeight = scrollRef.current?.scrollHeight;
          setPrevScrollHeight(currentHeight);
          setIsPaginating(true);
          fetchNextPage().finally(() => {
            setIsPaginating(false);
          });
        }
      },
      { threshold: 1 },
    );
    if (topObserverRef.current) {
      observer.observe(topObserverRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, isPaginating, fetchNextPage]);

  // 이전 페이지 페칭 후, 새 콘텐츠 높이만큼 스크롤 위치 복원
  useLayoutEffect(() => {
    if (
      prevScrollHeight !== null &&
      scrollRef.current &&
      !isFetchingNextPage &&
      !isPaginating
    ) {
      // DOM 업데이트 후 새 scrollHeight 측정
      const newScrollHeight = scrollRef.current.scrollHeight;
      // 이전 스크롤 높이와의 차이 계산 → 이 차이만큼 스크롤 이동
      const delta = newScrollHeight - prevScrollHeight;
      if (delta > 0) {
        // requestAnimationFrame을 활용해 렌더링 후 스크롤 조정
        requestAnimationFrame(() => {
          scrollRef.current.scrollTop = delta;
        });
      }
      // 사용 후 상태 리셋
      setPrevScrollHeight(null);
    }
  }, [messages, prevScrollHeight, isFetchingNextPage, isPaginating]);

  // STOMP 연결 및 실시간 메시지 수신
  useEffect(() => {
    const socket = new SockJS(`${process.env.REACT_APP_CHAT_SERVER_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("STOMP 연결 성공");
        client.subscribe(`/topic/chat/rooms/${chatRoomId}`, (message) => {
          const received = JSON.parse(message.body);
          console.log("수신 메시지:", received);
          setNewMessages((prev) => [...prev, received]);
        });
        setStompClient(client);
      },
    });

    client.activate();
    return () => {
      if (client.connected) client.deactivate();
    };
  }, [chatRoomId]);

  if (isLoading) return <Spinner />;
  let prevDate = null;
  return (
    <div
      className="flex flex-col w-full h-full overflow-y-auto h-screen"
      ref={scrollRef}
    >
      {/* 메시지 영역 */}
      <div className="px-[12px] pt-3 flex flex-col gap-[8px] relative mb-[80px]">
        {/* 무한 스크롤 상단 옵저버 */}
        <div ref={topObserverRef} className="h-1" />
        {messages.map((message) => {
          const currentDate = convertToDate(message.createdAt);
          const showDate = prevDate !== currentDate;
          prevDate = currentDate;
          return (
            <React.Fragment key={String(message.id)}>
              {showDate && <DateSeperationLine date={currentDate} />}
              <ChatMessage
                message={message}
                isSender={message.senderId === userInfo.userId}
              />
            </React.Fragment>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      {/* 메시지 입력창 */}
      <div className="w-full z-10 bg-white fixed bottom-10 max-w-[576px]">
        <ChatInput stompClient={stompClient} />
      </div>
    </div>
  );
}
