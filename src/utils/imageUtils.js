import Compressor from "compressorjs";
// ✅ 이미지 압축 함수 (Blob → File 변환 추가)
// eslint-disable-next-line no-shadow
export const compressImage = (file) => {
  console.log(`📷 압축 전 용량: ${(file.size / 1024).toFixed(2)} KB`);

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      quality: 0.75,
      mimeType: "image/webp",
      maxWidth: 1920,
      maxHeight: 1920,
      convertSize: 500000,
      success(result) {
        console.log(`✅ 압축 후 용량: ${(result.size / 1024).toFixed(2)} KB`);

        // 📌 압축된 `Blob`을 다시 `File`로 변환 (파일명 유지)
        const compressedFile = new File(
          [result],
          file.name.replace(/\.\w+$/, ".webp"),
          {
            type: "image/webp",
            lastModified: new Date().getTime(),
          },
        );

        resolve(compressedFile);
      },
      error(err) {
        reject(err);
      },
    });
  });
};
