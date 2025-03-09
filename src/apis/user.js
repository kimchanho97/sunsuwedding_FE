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

export const logout = async () => {
  return instance.post("/api/auth/logout");
};

export const updateProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  return instance.post("/api/user/profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProfileImage = async () => {
  return instance.delete("/api/user/profile-image");
};

export const deleteAccount = async () => {
  const response = await instance.delete("/api/user");
  return response.data;
};

export const getUserInfo = async () => {
  const response = await instance.get("/api/user/info");
  return response.data;
};
