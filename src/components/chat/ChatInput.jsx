import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ImageModal from "../common/modal/ImageModal";
import { ReactComponent as SendIcon } from "../../assets/send-01.svg";
import { ReactComponent as GalleryIcon } from "../../assets/gallery-01.svg";

function ChatInput({ stompClient }) {
  const { userInfo } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false); // 이미지 모달
  const [isUploading, setIsUploading] = useState(false); // 이미지 업로드 여부
  const { chatRoomCode } = useParams();

  const handleOpenImageModal = useCallback(() => {
    setImageModalOpen(true);
  }, [setImageModalOpen]);
  const handleCloseImageModal = useCallback(() => {
    setImageModalOpen(false);
  }, [setImageModalOpen]);

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const onClickSendMessage = useCallback(async () => {
    if (isUploading) return;
    if (!stompClient || !stompClient.connected || !message) return;
    const payload = {
      messageId: uuidv4(),
      senderId: userInfo.userId,
      senderName: userInfo.username,
      content: message,
      messageType: "TEXT",
      createdAt: new Date().toISOString(),
    };
    // console.log("✅ 전송 메시지:", payload);
    stompClient.publish({
      destination: `/app/chat/rooms/${chatRoomCode}/messages`,
      body: JSON.stringify(payload),
    });
    setMessage("");
  }, [chatRoomCode, message]);

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
        <ImageModal
          handleClose={handleCloseImageModal}
          open={imageModalOpen}
          setIsUploading={setIsUploading}
        />
      </Grid>
    </Grid>
  );
}

export default ChatInput;
