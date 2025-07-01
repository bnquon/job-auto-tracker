import axios from "axios";
import { tokenManager } from "../utils/auth";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    console.log("Interceptor - Token:", token); // Debug line
    console.log("Interceptor - Config headers before:", config.headers); // Debug line

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Interceptor - Config headers after:", config.headers); // Debug line
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
