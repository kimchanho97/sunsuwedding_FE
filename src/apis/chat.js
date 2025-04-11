import { chatInstance } from "./index";

export const fetchChatMessages = (chatRoomId, page, size) =>
  chatInstance.get(`/api/chat-messages/${chatRoomId}`, {
    params: { page, size },
  });
