import axios from "axios";
import AppSession from "../session/AppSession";

const api = axios.create({
  baseURL: "https://dev.api.operativa.startapps.com.pe/api/",
  // baseURL: "http://localhost:3005/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const newConfig = { ...config };
  const token = AppSession.get();
  if (token) {
    newConfig.headers.Authorization = `${token}`;
  }
  return newConfig;
});

api.interceptors.response.use(
  async (response) => {
    if (response?.data?.token) {
      AppSession.create(response.data.token)
    }
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default api;
