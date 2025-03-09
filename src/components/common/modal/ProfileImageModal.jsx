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
import "../../../firebase";
import { deleteProfileImage, updateProfileImage } from "../../../apis/user";
import { setUserInfo } from "../../../store/slices/userSlice";

function ProfileImageModal({ open, handleClose, setUploading }) {
  const { userInfo } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const onChangeAddFile = useCallback((e) => {
    const addedFile = e.target.files[0];
    if (addedFile) setFile(addedFile);
  }, []);

  // 프로필 이미지 업로드 API 호출
  const uploadFile = useCallback(async () => {
    if (!file) return;

    setUploading(true);
    try {
      const res = await updateProfileImage(file);
      console.log(res);
      console.log(res.data.profileImageUrl);
      dispatch(setUserInfo({ profileImageUrl: res.data.profileImageUrl }));
    } catch (error) {
      console.error("프로필 이미지 업로드 실패:", error.message);
    } finally {
      setUploading(false);
      setFile(null);
      handleClose();
    }
  }, [file, setUploading, dispatch, handleClose]);

  // 프로필 이미지 삭제
  const handleDeleteFile = useCallback(async () => {
    if (userInfo.profileImageUrl === null) {
      handleClose();
      return;
    }

    setUploading(true);
    try {
      await deleteProfileImage(); // API 호출
      dispatch(setUserInfo({ profileImageUrl: null }));
    } catch (error) {
      console.error("프로필 이미지 삭제 실패:", error.message);
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
          inputProps={{ accept: "image/jpeg, image/jpg, image/png, image/gif" }} // 이미지 파일 형식
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
