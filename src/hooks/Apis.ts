import axios from "axios";

import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

export const useApi = () => {
  const { token, logout } = useAuth();

  const fisioApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    timeout: 50000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  const fisioFetcher = async ({
    url,
    method,
    data,
    loadingFuntion,
    callback,
  }: {
    url: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    data?: any;
    loadingFuntion?: (value: boolean) => void;
    callback?: (data?: any) => void;
  }) => {
    loadingFuntion && loadingFuntion(true);
    try {
      const response = await fisioApi({
        url,
        method,
        data,
      });
      callback && callback(response.data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        toast.error("Erro ao se conectar com o servidor");
        return;
      }
      if (error.response?.status === 401) {
        toast.error("Sua sessão expirou, faça login novamente");
        logout();
        return;
      }
      toast.error(error.response?.data.message);
    } finally {
      loadingFuntion && loadingFuntion(false);
    }
  };

  return {
    fisioApi,
    logout,
    fisioFetcher,
    token,
  };
};
