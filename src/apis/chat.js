import { instance } from "./index";

export const createChatRoom = async (plannerId) => {
  return instance.post("/api/chat/room", {
    plannerId,
  });
};
