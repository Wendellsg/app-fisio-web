import axios from "axios";

import { toast } from "react-toastify";

const fisioApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const useApi = () => {
  const fisioFetcher = async ({
    url,
    method,
    data,
    loadingFunction,
    callback,
  }: {
    url: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    data?: any;
    loadingFunction?: (value: boolean) => void;
    callback?: (data?: any) => void;
  }) => {
    loadingFunction && loadingFunction(true);
    try {
      const response = await fisioApi({
        url,
        method,
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("fisio@token")}`,
        },
      });
      callback && callback(response.data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        toast.error("Erro ao se conectar com o servidor");
        return;
      }

      toast.error(error.response?.data.message);
    } finally {
      loadingFunction && loadingFunction(false);
    }
  };

  return {
    fisioApi,
    fisioFetcher,
  };
};
