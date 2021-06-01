import axios from "axios";
import AppSession from "../session/AppSession";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "http://localhost:3005/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Accept": "application/json",
  },
  responseType: "blob"
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
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.xlsx'); //or any other extension
    document.body.appendChild(link);
    link.click();
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default api;
