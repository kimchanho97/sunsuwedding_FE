import {
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageModal from "../common/modal/ImageModal";
import { ReactComponent as SendIcon } from "../../assets/send-01.svg";
import { ReactComponent as GalleryIcon } from "../../assets/gallery-01.svg";

function ChatInput({ stompClient }) {
  const { userInfo } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // 메세지 전송 여부
  const [imageModalOpen, setImageModalOpen] = useState(false); // 이미지 모달
  const [uploading, setUploading] = useState(false); // 이미지 업로드 여부
  const [percent, setPercent] = useState(0); // 이미지 업로드 퍼센트
  const { chatRoomId } = useParams();

  const handleOpenImageModal = useCallback(() => {
    setImageModalOpen(true);
  }, [setImageModalOpen]);
  const handleCloseImageModal = useCallback(() => {
    setImageModalOpen(false);
  }, [setImageModalOpen]);

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const createMessage = useCallback(() => {
    return {
      user: {
        userId: userInfo.userId,
        name: userInfo.username,
      },
      content: message,
      isRead: false, // 상대방의 읽음 유무
    };
  }, [message]);

  const onClickSendMessage = useCallback(async () => {
    if (!stompClient || !stompClient.connected || !message) return;

    const payload = {
      chatRoomId,
      // senderId: userInfo.userId,
      // senderName: userInfo.username,
      content: message,
      messageType: "TEXT",
      createAt: new Date().toISOString(),
    };

    stompClient.publish({
      destination: `/app/chat-rooms/${chatRoomId}/messages`,
      body: JSON.stringify(payload),
    });
    setMessage("");
  }, [chatRoomId, createMessage, message]);

  const onKeyDownEnter = (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter" && !e.shiftKey) {
      onClickSendMessage();
      e.preventDefault();
    }
  };

  return (
    <Grid container sx={{ px: "10px", pb: "20px" }}>
      <Grid item xs={12} sx={{ position: "relative" }}>
        <TextField
          maxRows={5}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  onClick={handleOpenImageModal}
                  aria-label="사진 업로드"
                >
                  <GalleryIcon className="w-6 h-6" />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={onClickSendMessage}
                  disabled={loading}
                  aria-label="메세지 전송"
                >
                  <SendIcon className="w-6 h-6" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="off"
          fullWidth
          multiline
          value={message}
          onChange={handleOnChange}
          onKeyDown={onKeyDownEnter}
        />

        {uploading ? (
          <Grid item xs={12} sx={{ m: "10px" }}>
            <LinearProgress variant="determinate" value={percent} />
          </Grid>
        ) : null}
        <ImageModal
          handleClose={handleCloseImageModal}
          open={imageModalOpen}
          setUploading={setUploading}
          setPercent={setPercent}
        />
      </Grid>
    </Grid>
  );
}

export default ChatInput;
