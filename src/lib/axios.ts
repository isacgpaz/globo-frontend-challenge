import { getTokenSSR } from "@/utils/cookies";
import axios, { AxiosHeaders } from "axios";

export function getAPIClient(ctx?: any) {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getTokenSSR({ req: ctx?.req, res: ctx?.res });

      if (token && config?.headers) {
        (config.headers as AxiosHeaders).set(
          "Authorization",
          `Bearer ${token}`
        );
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
}

export const api = getAPIClient();

