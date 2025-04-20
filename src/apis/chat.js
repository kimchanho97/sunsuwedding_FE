import { chatInstance } from "./index";

export const fetchChatMessages = (chatRoomCode, page, size) => {
  return chatInstance.get(`/api/chat/messages/${chatRoomCode}`, {
    params: { page, size },
  });
};

export const createChatRoom = async (userId, plannerId) => {
  const response = await chatInstance.post("/api/chat/rooms", {
    userId,
    plannerId,
  });
  return response.data;
};

export const validateChatRoom = async (chatRoomCode, userId) => {
  const response = await chatInstance.post("/api/chat/rooms/validate", {
    chatRoomCode,
    userId,
  });
  return response.data; // boolean 또는 error
};

export const sendChatImageMessage = async (
  chatRoomCode,
  messagePayload,
  imageFile,
) => {
  const formData = new FormData();
  formData.append(
    "message",
    new Blob([JSON.stringify(messagePayload)], { type: "application/json" }),
  );
  formData.append("image", imageFile);

  await chatInstance.post(
    `/api/chat/messages/${chatRoomCode}/image`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
};
