import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  withCredentials: true, // 쿠키
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.code === "ECONNABORTED") {
      alert(
        "죄송합니다, 서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.",
      );
      window.location.href = "/";
    }

    const { response } = error;
    if (response) {
      const { status, data } = response;
      // 백엔드에서 받은 code, message + HTTP status도 포함
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ status, ...data });
    }
    // API 서버와 통신이 불가능할 때
    return Promise.reject(error);
  },
);

export const chatInstance = axios.create({
  baseURL: process.env.REACT_APP_CHAT_SERVER_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

chatInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 필요시 chat 전용 에러 처리
    return Promise.reject(error);
  },
);
