import axios from "axios";
import { useAuth } from "./useAuth";

export const useApi = () => {
  const { userToken } = useAuth();
  const FioApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
      authoriathion: `Bearer ${userToken}`,
    },
  });

  return {
    FioApi,
  };
};
