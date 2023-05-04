import { useAtom } from "jotai/react";
import { routineAtom, routinesAtom } from "./states";
import { useApi } from "./Apis";
import { Routine } from "../types";
import { useFeedBack } from "./useFeedback";

export const useRoutines = () => {
  const [routines, setRoutines] = useAtom(routinesAtom);
  const [routine, setRoutine] = useAtom(routineAtom);

  const { FioApi } = useApi();
  const { feedBack, loading } = useFeedBack();

  const getRoutines = async (pacientId: string) => {
    try {
      const response = await FioApi.get(`/routines?pacientId=${pacientId}`);
      setRoutines(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoutine = async (id: string) => {
    try {
      const response = await FioApi.get(`/routines/${id}`);
      setRoutine(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createRoutine = async (routine: Partial<Routine>) => {
    loading("Criando rotina...");
    try {
      await FioApi.post(`/routines`, routine);
    } catch (error) {
      feedBack("error", "Não foi possível criar a rotina!");
    }
  };

  const updateRoutine = async (routine: Partial<Routine>) => {
    loading("Atualizando rotina...");
    try {
      await FioApi.put(`/routines/${routine.id}`, routine);
      feedBack("success", "Rotina atualizada com sucesso!");
    } catch (error) {
      feedBack("error", "Não foi possível atualizar a rotina!");
    }
  };

  const deleteRoutine = async (id: string) => {
    loading("Apagando rotina...");
    try {
      await FioApi.delete(`/routines/${id}`);
      feedBack("success", "Rotina apagada com sucesso!");
    } catch (error) {
      console.log(error);
      feedBack("error", "Não foi possível apagar a rotina!");
    }
  };

  return {
    getRoutines,
    getRoutine,
    routines,
    routine,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    loading,
  };
};
