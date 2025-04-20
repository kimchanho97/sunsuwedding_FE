import { useQuery } from "react-query";
import { fetchChatPartnerProfile } from "../apis/chat";

export default function useChatPartnerProfile(chatRoomCode, requesterId) {
  return useQuery({
    queryKey: ["chatPartner", chatRoomCode],
    queryFn: () => fetchChatPartnerProfile(chatRoomCode, requesterId),
    enabled: !!chatRoomCode && !!requesterId, // 두 값이 있을 때만 요청
    staleTime: Infinity,
  });
}
