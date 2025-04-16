import { instance } from "./index";

export const getFavoriteList = (page) => {
  return instance.get(`/api/favorite?page=${page}`);
};

export const addFavorite = async ({ portfolioId }) => {
  return instance.post(`/api/favorite/${portfolioId}`);
};

export const deleteFavorite = async ({ portfolioId }) => {
  return instance.delete(`/api/favorite/${portfolioId}`);
};
