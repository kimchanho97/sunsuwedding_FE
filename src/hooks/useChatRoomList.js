import { useInfiniteQuery } from "react-query";
import { fetchChatRooms } from "../apis/chat";

export default function useFetchChatRooms(userId) {
  const infiniteQuery = useInfiniteQuery(
    ["chatRooms", userId],
    ({ pageParam = 10 }) => fetchChatRooms(userId, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const fetchedSize = allPages.flatMap((page) => page.data).length;
        return lastPage.hasNext ? fetchedSize + 10 : undefined;
      },
      keepPreviousData: true,
      refetchOnWindowFocus: true,
    },
  );

  const allChatRooms = infiniteQuery?.data?.pages.flatMap((page) => page?.data);

  return {
    chatRooms: allChatRooms,
    ...infiniteQuery,
  };
}
