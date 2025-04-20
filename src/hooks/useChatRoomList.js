import { useInfiniteQuery, useQueryClient } from "react-query";
import { useMemo } from "react";
import { fetchChatRooms } from "../apis/chat";

const PAGE_SIZE = 10;

export default function useFetchChatRooms(userId) {
  const queryClient = useQueryClient();

  const infiniteQuery = useInfiniteQuery(
    ["chatRooms", userId],
    // size 기반 요청 (cursor나 offset 없이 size만 전달)
    ({ pageParam = PAGE_SIZE }) => fetchChatRooms(userId, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.data.length + PAGE_SIZE : undefined,

      // ✅ 페이지를 계속 누적하지 않고, 마지막 페이지만 유지
      onSuccess: (data) => {
        const latestPage = data.pages[data.pages.length - 1];
        queryClient.setQueryData(["chatRooms", userId], {
          pages: [latestPage],
          pageParams: [0], // 초기값 고정
        });
      },

      // 선택적: refetch 시 새로고침 느낌 유지
      refetchOnWindowFocus: false,
      staleTime: 0,
      cacheTime: 0,
    },
  );

  // ✅ 항상 1개의 페이지 데이터만 반환되도록 정리
  const chatRooms = useMemo(() => {
    return infiniteQuery.data?.pages[0]?.data || [];
  }, [infiniteQuery.data]);

  return {
    chatRooms,
    ...infiniteQuery,
  };
}
