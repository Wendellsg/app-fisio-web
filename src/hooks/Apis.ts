import axios from "axios";
import { useAtom } from "jotai";
import { tokenAtom } from "./states";
import { useEffect } from "react";

export const useApi = () => {
  const [token, setToken] = useAtom(tokenAtom);

  const fisioApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    timeout: 50000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("fisio@token");
    if (token) {
      setToken(token);
    }
  }, []);

  return {
    fisioApi,
    setToken,
  };
};
