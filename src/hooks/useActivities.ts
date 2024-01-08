import { Activity } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useApi } from "./Apis";

export const useActivities = () => {
  const { fisioFetcher } = useApi();
  const getActivities = async (): Promise<Activity[]> => {
    try {
      const response = await fisioFetcher({
        url: `users/activities`,
        method: "GET",
      });
      return response;
    } catch (error) {
      toast.error("Erro ao buscar atividades");
      return [];
    }
  };
  const { data: activities } = useQuery({
    queryFn: getActivities,
    queryKey: ["activities"],
    staleTime: 1000 * 60 * 10,
  });

  return {
    activities,
  };
};
