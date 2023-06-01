import { useAtom } from "jotai";
import { useState } from "react";
import { Exercise } from "../types";
import { useApi } from "./Apis";
import { exercisesAtom } from "./states";
export const useExercises = () => {
  const [exercises, setExercises] = useAtom(exercisesAtom);
  const [exercise, setExercise] = useState<Exercise>({} as Exercise);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { fisioApi } = useApi();

  const getExercises = async () => {
    setLoading(true);
    try {
      const response = await fisioApi.get("/exercises");
      setExercises(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const findExercise = async (id: string) => {
    setLoading(true);
    try {
      const response = await fisioApi.get(`/exercises/${id}`);
      setExercise(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const searchExercises = async (search: {
    category?: string;
    name?: string;
  }) => {
    setLoading(true);
    try {
      const response = await fisioApi.get(
        `/exercises?category=${search.category}&name=${search.name}`
      );
      setExercises(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    exercises,
    exercise,
    loading,
    findExercise,
    getExercises,
    searchExercises,
    error,
  };
};
