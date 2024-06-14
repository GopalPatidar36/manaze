import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:6036",
});

instance.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return request;
});

export default instance;
