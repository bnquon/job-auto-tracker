import axios from "axios";
import { tokenManager } from "../utils/auth";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "/", // Use env var in dev, fallback to "/" for production
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenManager.removeToken();
    }
    return Promise.reject(error);
  }
);

export const api = apiClient;
