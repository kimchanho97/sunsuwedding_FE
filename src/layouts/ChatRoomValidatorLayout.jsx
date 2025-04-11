import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import GNBBOX from "../components/common/GNBBOX";
import GNB from "../components/common/GNB";
import { validateChatRoom } from "../apis/chat";

export default function ChatRoomValidatorLayout() {
  const { isLogged, userInfo } = useSelector((state) => state.user);
  const { chatRoomCode } = useParams();
  const navigate = useNavigate();
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    const validate = async () => {
      if (!isLogged) {
        navigate("/login", { replace: true });
        return;
      }

      if (!chatRoomCode || !userInfo?.userId) {
        navigate("/404", { replace: true });
        return;
      }

      try {
        const res = await validateChatRoom(chatRoomCode, userInfo.userId);
        if (!res.valid) {
          navigate("/404", { replace: true });
        } else {
          setIsValidated(true);
        }
      } catch (error) {
        console.error("채팅방 검증 실패:", error);
        navigate("/404", { replace: true });
      }
    };

    validate();
  }, [isLogged, chatRoomCode, userInfo, navigate]);

  if (!isValidated) {
    return null; // 👉 여기서 아무것도 안 보여줌
  }

  return (
    <div>
      <Outlet />
      <GNBBOX />
      <GNB />
    </div>
  );
}
