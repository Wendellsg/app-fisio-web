import { toast } from "react-toastify";
import { Routine } from "../types";
import { useApi } from "./Apis";

export const useRoutines = () => {
  const { fisioFetcher } = useApi();

  const getRoutine = async (userid: string, id: string) => {
    return await fisioFetcher({
      url: `/users/${userid}/routines/${id}`,
      method: "GET",
    });
  };

  const createRoutine = async (userId: string, routine: Partial<Routine>) => {};

  const updateRoutine = async (userId: string, routine: Partial<Routine>) => {
    return await fisioFetcher({
      url: `/users/${userId}/routines`,
      method: "POST",
      data: routine,
      callback: () => {
        toast.success("Rotina atualizada com sucesso");
      },
    });
  };

  const deleteRoutine = async (userId: string, routineId: string) => {
    return await fisioFetcher({
      url: `/users/${userId}/routines/${routineId}`,
      method: "DELETE",
      callback: () => {
        toast.success("Rotina removida com sucesso");
      },
    });
  };

  return {
    getRoutine,
    createRoutine,
    updateRoutine,
    deleteRoutine,
  };
};
