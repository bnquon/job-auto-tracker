import axios from "axios";
import { tokenManager } from "../utils/auth";

const apiClient = axios.create({
  baseURL: "/",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(
      "Making request to:",
      (config.baseURL || "") + (config.url || "")
    );

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
