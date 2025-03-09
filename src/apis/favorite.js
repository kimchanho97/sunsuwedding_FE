import { instance } from "./index";

export const getFavoriteList = async (page) => {
  const res = await instance.get(`/api/favorite?page=${page}`);
  return res.data;
};

export const addFavorite = async ({ portfolioId }) => {
  return instance.post(`/api/favorite/${portfolioId}`);
};

export const deleteFavorite = async ({ portfolioId }) => {
  return instance.delete(`/api/favorite/${portfolioId}`);
};
