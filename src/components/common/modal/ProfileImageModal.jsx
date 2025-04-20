import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import heic2any from "heic2any";
import { deleteProfileImage, updateProfileImage } from "../../../apis/user";
import { setUserInfo } from "../../../store/slices/userSlice";
import useDefaultErrorHandler from "../../../hooks/useDefaultErrorHandler";
import { compressImage } from "../../../utils/imageUtils";

function ProfileImageModal({ open, handleClose, setUploading }) {
  const { userInfo } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "heic"];

  // ✅ 파일 선택 핸들러 (압축 적용)
  const onChangeAddFile = useCallback(async (e) => {
    let addedFile = e.target.files[0];
    if (!addedFile) return;

    // ❌ 허용되지 않은 확장자 거부
    const fileExtension = addedFile.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert("허용되지 않은 이미지 확장자입니다.");
      return;
    }

    try {
      // ✅ HEIC 변환 (HEIC → JPEG)
      if (fileExtension === "heic") {
        const blob = addedFile;
        const resultBlob = await heic2any({ blob, toType: "image/jpeg" });

        addedFile = new File(
          [resultBlob],
          `${addedFile.name.split(".")[0]}.jpg`,
          { type: "image/jpeg", lastModified: new Date().getTime() },
        );
      }

      // ✅ 이미지 압축
      const compressedFile = await compressImage(addedFile);
      setFile(compressedFile);
    } catch (error) {
      console.error("이미지 변환/압축 실패:", error);
    }
  }, []);

  // ✅ 프로필 이미지 업로드 API 호출
  const uploadFile = useCallback(async () => {
    if (!file) return;

    setUploading(true);
    try {
      const res = await updateProfileImage(file);
      dispatch(setUserInfo({ profileImageUrl: res.data.profileImageUrl }));
    } catch (error) {
      console.error("프로필 이미지 업로드 실패:", error.message);
      defaultErrorHandler(error);
    } finally {
      setUploading(false);
      setFile(null);
      handleClose();
    }
  }, [file, setUploading, dispatch, handleClose]);

  // ✅ 프로필 이미지 삭제 API 호출
  const handleDeleteFile = useCallback(async () => {
    if (userInfo.profileImageUrl === null) {
      handleClose();
      return;
    }

    setUploading(true);
    try {
      await deleteProfileImage();
      dispatch(setUserInfo({ profileImageUrl: null }));
    } catch (error) {
      console.error("프로필 이미지 삭제 실패:", error.message);
      defaultErrorHandler(error);
    } finally {
      setUploading(false);
      handleClose();
    }
  }, [setUploading, dispatch, handleClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>프로필 이미지 설정</DialogTitle>
      <DialogContent>
        <Input
          margin="dense"
          inputProps={{
            accept:
              "image/jpeg, image/jpg, image/png, image/gif, image/webp, image/heic",
          }}
          type="file"
          fullWidth
          variant="standard"
          onChange={onChangeAddFile}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          취소
        </Button>
        <Button onClick={uploadFile}>등록</Button>
        <Button onClick={handleDeleteFile} color="error">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProfileImageModal;
