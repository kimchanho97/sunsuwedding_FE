import { instance } from "./index";

export const getPortfolioList = async (
  page,
  name,
  location,
  minPrice,
  maxPrice,
) => {
  const params = new URLSearchParams();

  // ✅ null이 아닌 값만 추가
  params.append("page", page);
  if (name) params.append("name", name);
  if (location) params.append("location", location);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);

  const response = await instance.get(`/api/portfolio/v1?${params.toString()}`);
  return response.data;
};

export const getPortfolioListCursor = async (
  cursor,
  name,
  location,
  minPrice,
  maxPrice,
) => {
  const params = new URLSearchParams();

  // ✅ 첫 요청일 경우, cursor를 추가하지 않음
  if (cursor !== null) {
    params.append("cursor", cursor);
  }
  if (name) params.append("name", name);
  if (location) params.append("location", location);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);

  const response = await instance.get(`/api/portfolio/v3?${params.toString()}`);
  return response.data;
};

export const getPortfolioDetail = async (portfolioId) => {
  const response = await instance.get(`/api/portfolio/${portfolioId}`);
  return response.data;
};

export const createPortfolio = async (portfolioData) => {
  const formData = new FormData();
  const { images, ...portfolioInfo } = portfolioData;
  formData.append(
    "portfolio",
    new Blob([JSON.stringify(portfolioInfo)], { type: "application/json" }),
  );

  // 이미지 파일들을 FormData에 추가
  images.forEach((image) => {
    formData.append("images", image); // ✅ 여러 개의 파일을 `images[]`로 추가
  });

  // Axios 요청 (multipart/form-data)
  return instance.post("/api/portfolio", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updatePortfolio = async (portfolioData) => {
  const formData = new FormData();
  const { existingImages, newImages, deletedImages, ...portfolioInfo } =
    portfolioData;

  // 📌 포트폴리오 정보 추가 (JSON 변환 후 FormData에 추가)
  formData.append(
    "portfolio",
    new Blob([JSON.stringify(portfolioInfo)], { type: "application/json" }),
  );

  // 📌 기존 이미지(S3 URL) 포함
  existingImages.forEach((imageUrl) => {
    formData.append("existingImages", imageUrl); // S3 URL 그대로 전달
  });

  // 📌 새로 추가된 이미지 포함
  newImages.forEach((image) => {
    formData.append("newImages", image); // 새 파일 추가
  });

  // 📌 삭제할 이미지 URL 포함
  deletedImages.forEach((imageUrl) => {
    formData.append("deletedImages", imageUrl);
  });

  // 📌 Axios 요청
  return instance.put("/api/portfolio", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deletePortfolio = async () => {
  return instance.delete("/api/portfolio");
};

export const getPortfolioSelf = async () => {
  const res = await instance.get("/api/portfolio/me");
  return res.data;
};
