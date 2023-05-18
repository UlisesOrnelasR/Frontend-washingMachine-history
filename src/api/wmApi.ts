import axios, { AxiosRequestConfig } from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

interface InternalAxiosRequestConfig extends AxiosRequestConfig {
  headers: any; // Aquí deberías usar el tipo adecuado para tus headers
}

export const wmApi = axios.create({
  baseURL: VITE_API_URL,
});

// interceptors errors handlers
wmApi.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    config.headers = {
      ...config.headers,
      "x-token": localStorage.getItem("token"),
    };

    return config;
  }
);
