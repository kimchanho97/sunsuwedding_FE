import { useInfiniteQuery } from "react-query";
import { fetchChatMessages } from "../apis/chat";

const PAGE_SIZE = 15;

const useChatMessages = (chatRoomCode) => {
  return useInfiniteQuery(
    ["chatMessages", chatRoomCode],
    ({ pageParam = 0 }) =>
      fetchChatMessages(chatRoomCode, pageParam, PAGE_SIZE),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasNext ? allPages.length : undefined,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );
};

export default useChatMessages;
