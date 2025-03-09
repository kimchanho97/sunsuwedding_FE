import { BsCamera } from "react-icons/bs";
import heic2any from "heic2any";
import Compressor from "compressorjs";
import { useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close-01.svg";
import Photo from "./atoms/Photo";
import useOpenBottomSheet from "../../hooks/useOpenBottomSheet";

export default function ImageUploadZone({ images, setImages, setIsUploading }) {
  const { openBottomSheetHandler } = useOpenBottomSheet();
  const [previewImages, setPreviewImages] = useState([]); // 미리보기 이미지
  const isPWA = window.matchMedia("(display-mode: standalone)").matches;
  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "heic"];

  useEffect(() => {
    console.log("PWA 모드:", isPWA);
    if (isPWA) {
      openBottomSheetHandler({
        bottomSheet: "messageBottomSheet",
        message:
          "모바일 환경에서는 일부 브라우저에서 파일 업로드가 제한될 수 있습니다. 문제가 발생하면 크롬 또는 최신 브라우저를 사용해주세요.",
      });
    }
  }, []);

  // ✅ 이미지 압축 함수
  const compressImage = (file) => {
    console.log(`압축 전 용량: ${(file.size / 1024).toFixed(2)} KB`);

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-new
      new Compressor(file, {
        quality: 0.75, // 압축률 (0.7~0.8이 가장 균형 잡힌 설정)
        mimeType: "image/webp", // WEBP로 변환 (파일 크기 절감 효과)
        maxWidth: 1920, // 최대 너비 (Full HD 해상도)
        maxHeight: 1920, // 최대 높이 (Full HD 해상도)
        convertSize: 500000, // 500KB 이상일 때만 WEBP 변환
        success(result) {
          console.log(`압축 후 용량: ${(result.size / 1024).toFixed(2)} KB`);
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  };

  // ✅ 파일 추가 핸들러
  const onChangeAddFile = async (e) => {
    setIsUploading(true);
    let addedFile = e.target.files[0];
    if (!addedFile) {
      setIsUploading(false);
      return;
    }

    // ❌ 허용되지 않은 확장자 거부
    const fileExtension = addedFile.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert("허용되지 않은 이미지 확장자입니다.");
      setIsUploading(false);
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

      // ✅ Base64 미리보기 변환
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => [...prev, reader.result]); // ✅ 렌더링용 (Base64)
      };
      reader.readAsDataURL(compressedFile);

      // ✅ 바이너리 데이터 저장 (Base64 인코딩 없이)
      setImages([...images, compressedFile]);
    } catch (error) {
      console.error("이미지 변환/압축 실패:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // ✅ 이미지 삭제 핸들러
  const handleDeleteImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex flex-col gap-[5px]">
        <h6 className="text-xs">
          <span>사진 |</span>
          <span className=" text-gray-sunsu"> 최대 5장</span>
        </h6>
      </div>
      <div className="grid w-full grid-cols-3 gap-2">
        {previewImages.map((imageItem, idx) => (
          <div
            className="relative w-full h-0"
            style={{ paddingBottom: "100%" }}
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
          >
            <Photo
              src={imageItem}
              alt="결혼 사진"
              className="absolute w-[98%] h-[98%] object-cover object-center rounded-[10px] left-0 bottom-0"
            />
            <button
              onClick={() => handleDeleteImage(idx)}
              className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            >
              <CloseIcon className="w-2 h-2" />
            </button>
          </div>
        ))}
        {images.length < 5 && (
          <label
            htmlFor="photo"
            className="cursor-pointer relative w-full h-0 pb-[100%]"
          >
            <div className="absolute w-[98%] h-[98%] left-0 bottom-0 bg-lightgray-sunsu rounded-[10px] flex flex-col justify-center items-center gap-1 hover:border-2">
              <BsCamera size={25} />
              <span className="text-xs">사진 추가</span>
              <input
                type="file"
                className="w-0 h-0"
                id="photo"
                accept="image/*, image/heic"
                onChange={onChangeAddFile}
              />
            </div>
          </label>
        )}
      </div>
    </>
  );
}
