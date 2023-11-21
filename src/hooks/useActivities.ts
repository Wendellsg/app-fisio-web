import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { activityByDoctor } from "../types";
import { useApi } from "./Apis";

export const useActivities = () => {
  const { fisioFetcher } = useApi();
  const getActivities = async (): Promise<activityByDoctor[]> => {
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
  const { data: activities, isFetching } = useQuery({
    queryFn: getActivities,
    queryKey: ["activities"],
    staleTime: 1000 * 60 * 10,
  });

  return {
    activities,
  };
};
