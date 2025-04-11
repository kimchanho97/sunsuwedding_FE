import { chatInstance } from "./index";

export const fetchChatMessages = (chatRoomCode, page, size) =>
  chatInstance.get(`/api/chat-messages/${chatRoomCode}`, {
    params: { page, size },
  });

export const createChatRoom = async (userId, plannerId) => {
  const response = await chatInstance.post("/api/chat-rooms", {
    userId,
    plannerId,
  });
  return response.data;
};

export const validateChatRoom = async (chatRoomCode, userId) => {
  const response = await chatInstance.post("/api/chat-rooms/validate", {
    chatRoomCode,
    userId,
  });
  return response.data; // boolean 또는 error
};
