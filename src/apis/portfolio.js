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
  const {
    plannerName,
    items,
    images,
    title,
    description,
    location,
    career,
    partnerCompany,
  } = portfolioData;
  return instance.post("/api/portfolio", {
    plannerName,
    items,
    images,
    title,
    description,
    location,
    career,
    partnerCompany,
  });
};

export const updatePortfolio = async (portfolioData) => {
  const {
    plannerName,
    items,
    images,
    title,
    description,
    location,
    career,
    partnerCompany,
  } = portfolioData;
  return instance.put("/api/portfolio", {
    plannerName,
    items,
    images,
    title,
    description,
    location,
    career,
    partnerCompany,
  });
};

export const deletePortfolio = async () => {
  return instance.delete("/api/portfolio");
};

export const getPortfolioSelf = async () => {
  return instance.get("/api/portfolio/me");
};
