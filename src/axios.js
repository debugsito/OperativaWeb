import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://www.operativaapi.tk:8080/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

Api.interceptors.request.use(async (config) => {
  const newConfig = { ...config };
  const token = localStorage.getItem('token');

  if (token) {
    newConfig.headers.Authorization = `Bearer ${token}`;
  }

  return newConfig;
});

Api.interceptors.response.use(
  async (response) => {
    //Validar la respuesta del token
    if (response.data.Authorization) {
      localStorage.setItem('token', response.data.Authorization);
    }

    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      //window.location = '/';
    }
    return Promise.reject(error);
  }
);

export default Api;
