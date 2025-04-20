import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import heic2any from "heic2any";
import { sendChatImageMessage } from "../../../apis/chat";
import { compressImage } from "../../../utils/imageUtils";

function ImageModal({ open, handleClose, setIsUploading }) {
  const { userInfo } = useSelector((state) => state.user);
  const { chatRoomCode } = useParams();
  const [file, setFile] = useState(null);
  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "heic"];

  const onChangeAddFile = useCallback(
    async (e) => {
      let addedFile = e.target.files?.[0];
      if (!addedFile) return;

      const fileExtension = addedFile.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        alert("허용되지 않은 이미지 확장자입니다.");
        return;
      }

      try {
        setIsUploading(true);

        // ✅ HEIC 변환
        if (fileExtension === "heic") {
          const blob = addedFile;
          const resultBlob = await heic2any({ blob, toType: "image/jpeg" });
          addedFile = new File(
            [resultBlob],
            `${addedFile.name.split(".")[0]}.jpg`,
            { type: "image/jpeg", lastModified: new Date().getTime() },
          );
        }

        // ✅ 압축
        const compressedFile = await compressImage(addedFile);
        setFile(compressedFile);
      } catch (err) {
        console.error("이미지 변환/압축 실패:", err);
      } finally {
        setIsUploading(false);
      }
    },
    [setIsUploading],
  );

  const handleSendFile = useCallback(async () => {
    if (!file || !chatRoomCode) {
      handleClose();
      return;
    }

    const payload = {
      senderId: userInfo.userId,
      senderName: userInfo.username,
      content: file.name,
      messageType: "IMAGE",
      createdAt: new Date().toISOString(),
    };

    try {
      setIsUploading(true);
      await sendChatImageMessage(chatRoomCode, payload, file);
    } catch (err) {
      console.error("❌ 이미지 메시지 전송 실패:", err);
    } finally {
      setIsUploading(false);
      setFile(null);
      handleClose();
    }
  }, [file, chatRoomCode, userInfo, handleClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>이미지 보내기</DialogTitle>
      <DialogContent>
        <Input
          type="file"
          inputProps={{
            accept: allowedExtensions.map((ext) => `image/${ext}`).join(","),
          }}
          fullWidth
          onChange={onChangeAddFile}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleSendFile} disabled={!file}>
          전송
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageModal;
