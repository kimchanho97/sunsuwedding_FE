import { chatInstance } from "./index";

export const fetchChatMessages = (chatRoomId, page, size) =>
  chatInstance.get(`/api/chat-messages/${chatRoomId}`, {
    params: { page, size },
  });

export const createChatRoom = async (userId, plannerId) => {
  const res = await chatInstance.post("/api/chat-rooms", { userId, plannerId });
  return res.data;
};
