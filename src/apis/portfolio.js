import { instance } from "./index";

export const getPortfolioList = async (
  nextCursor,
  name,
  location,
  minPrice,
  maxPrice,
) => {
  const response = await instance.get(
    `/api/portfolio/v1?page=${nextCursor}&name=${name}&location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
  );
  return response.data;
};

export const getPortfolioDetail = async (portfolioId) => {
  return instance.get(`/api/portfolio/${portfolioId}`);
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
