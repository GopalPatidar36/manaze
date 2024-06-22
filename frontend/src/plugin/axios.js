import axios from "axios";

const instance = axios.create({
  baseURL: "https://manaze-backend.vercel.app/api",
});

instance.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return request;
});

export default instance;
