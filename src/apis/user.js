import { instance } from "./index";

export const signup = async (data) => {
  const { role, username, email, password, password2 } = data;
  const response = await instance.post("/api/user/signup", {
    role,
    email,
    password,
    password2,
    username,
  });
  return response.data;
};

export const login = async (loginData) => {
  const { email, password } = loginData;
  const response = await instance.post("/api/user/login", { email, password });
  // 로그인시 accessToken, refreshToken을 localStorage에 저장
  localStorage.setItem("accessToken", response.headers.get("Authorization"));
  localStorage.setItem("refreshToken", response.headers.get("Refresh"));
  return response.data;
};

export const deleteAccount = async () => {
  const response = await instance.delete("/api/user");
  return response.data;
};

export const getUserInfo = async () => {
  const response = await instance.get("/api/user/info");
  return response.data;
};
