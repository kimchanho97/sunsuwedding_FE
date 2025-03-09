import { instance } from "./index";

export const signup = async (data) => {
  const { role, username, email, password, password2 } = data;
  return instance.post("/api/user/signup", {
    role,
    email,
    password,
    password2,
    username,
  });
};

export const login = async (loginData) => {
  const { email, password } = loginData;
  return instance.post("/api/auth/login", { email, password });
};

export const deleteAccount = async () => {
  const response = await instance.delete("/api/user");
  return response.data;
};

export const getUserInfo = async () => {
  const response = await instance.get("/api/user/info");
  return response.data;
};
