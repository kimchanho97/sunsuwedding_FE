import React, { useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import BottomSheet from "../common/bottomsheet/BottomSheet";
import useOpenBottomSheet from "../../hooks/useOpenBottomSheet";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";

export default function ChatConfirmBottomSheet({
  plannerName,
  // plannerId,
  onClose,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLogged } = useSelector((state) => state.user);
  // const navigate = useNavigate();
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const { openBottomSheetHandler } = useOpenBottomSheet();

  const handleOnCreateChatRoom = async () => {
    if (!isLogged) {
      openBottomSheetHandler({ bottomSheet: "loginBottomSheet" });
      return;
    }
    setIsSubmitting(true);
    try {
      // const response = await createChatRoom(plannerId);
      // navigate(`/chat/${response.chatRoomId}`);
    } catch (error) {
      defaultErrorHandler(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BottomSheet onClose={onClose}>
      <div>
        <div className="flex flex-col tracking-tight font-bold text-lg pb-10">
          <span>웨딩 상담을 고민 중이신가요?</span>
          <span>{plannerName} 플래너님과 편하게 대화해보세요!</span>
        </div>
        <button
          className="block w-full h-[50px] rounded-[10px] text-sm bg-lightskyblue-sunsu"
          onClick={handleOnCreateChatRoom}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={20} /> : <span>입장</span>}
        </button>
      </div>
    </BottomSheet>
  );
}
