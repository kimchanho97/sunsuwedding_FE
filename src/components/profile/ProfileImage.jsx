import { useState } from "react";
import { BsCamera } from "react-icons/bs";
import { useSelector } from "react-redux";
import Photo from "../common/atoms/Photo";
import ProfileImageModal from "../common/modal/ProfileImageModal";
import ProfileImageSpinner from "./ProfileImageSpinner";
import { defaultAvatarUrl } from "../../utils/constants";

export default function ProfileImage() {
  const [imageModalOpen, setImageModalOpen] = useState(false); // 이미지 모달
  const [upLoading, setUploading] = useState(false); // 업로드 중
  const { userInfo } = useSelector((state) => state.user);

  const handleOpenImageModal = () => {
    setImageModalOpen(true);
  };
  const handleCloseImageModal = () => {
    setImageModalOpen(false);
  };

  return (
    <>
      <ProfileImageModal
        handleClose={handleCloseImageModal}
        open={imageModalOpen}
        setUploading={setUploading}
      />
      <div className="relative min-w-[100px] min-h-[100px] w-[40%] h-[40%] max-w-[160px] max-h-[160px] after:pb-[100%] after:block">
        <Photo
          src={userInfo.profileImageUrl || defaultAvatarUrl}
          alt={`${userInfo.username}님의 프로필 사진`}
          className="absolute right-0 bottom-0 object-cover object-center w-full h-full rounded-full"
        />
        {upLoading && <ProfileImageSpinner />}
        <button
          className="absolute bottom-[7%] right-[7%] w-6 h-6 p-1 rounded-full bg-zinc-100 cursor-pointer hover:bg-zinc-500 hover:text-white xs:bottom-[4%] xs:right-[4%]"
          onClick={handleOpenImageModal}
          aria-label="프로필 사진 변경"
        >
          <BsCamera className="w-full h-ful" />
        </button>
      </div>
    </>
  );
}
