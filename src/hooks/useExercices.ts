import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "react-toastify";
import { Exercise } from "../types";
import { useApi } from "./Apis";
import { exercisesAtom } from "./states";
export const useExercises = () => {
  const [exercises, setExercises] = useAtom(exercisesAtom);
  const [loading, setLoading] = useState<boolean>(false);

  const { fisioFetcher } = useApi();

  const getExercises = async () => {
    const response = await fisioFetcher({
      url: "/exercises",
      method: "GET",
      loadingFuntion: setLoading,
    });

    if (response) {
      setExercises(response);
    }
  };

  const getExercise = async (id: string) => {
    const response = await fisioFetcher({
      url: `/exercises/${id}`,
      method: "GET",
    });
    return response;
  };

  const searchExercises = async (search: {
    category?: string;
    name?: string;
  }) => {
    const response = await fisioFetcher({
      url: `/exercises?category=${search.category}&name=${search.name}`,
      method: "GET",
      loadingFuntion: setLoading,
    });

    if (!response) return;
    setExercises(response);
  };

  const createExercise = async (exercise: Exercise) => {
    await fisioFetcher({
      url: "/exercises",
      method: "POST",
      data: exercise,
      callback: () => {
        getExercises();
        toast.success("Exercício criado com sucesso!");
      },
    });
  };

  const updateExercise = async (exercise: Exercise) => {
    console.log(exercise);
    await fisioFetcher({
      url: `/exercises/${exercise._id}`,
      method: "PATCH",
      data: exercise,
      callback: () => {
        getExercises();
        toast.success("Exercício criado com sucesso!");
      },
    });
  };

  const deleteExercise = async (id: string) => {
    await fisioFetcher({
      url: `/exercises/${id}`,
      method: "DELETE",
      callback: () => {
        getExercises();
        toast.success("Exercício excluído com sucesso!");
      },
    });
  };

  return {
    exercises,
    loading,
    getExercise,
    getExercises,
    searchExercises,
    createExercise,
    updateExercise,
    deleteExercise,
  };
};
