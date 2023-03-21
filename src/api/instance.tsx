import { getCookie } from '@/utils/cookie';
import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_API_BASE_URL}`;

export const instance = axios.create({
  timeout: 5000,
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  (config: any) => {
    if (config.headers) {
      const token = getCookie('accessToken');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);
