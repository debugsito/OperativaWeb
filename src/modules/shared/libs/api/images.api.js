import axios from "axios";
import AppSession from "../session/AppSession";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        "Accept": "*/*",
    },
    redirect: 'follow'
});

api.interceptors.request.use(async (config) => {
    const newConfig = { ...config };
    console.log("config", newConfig)
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
);;

export default api;
