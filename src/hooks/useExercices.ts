import { useState } from "react";
import { Exercise } from "../types";
import { useApi } from "./Apis";
export const useExercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exercise, setExercise] = useState<Exercise>({} as Exercise);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { FioApi } = useApi();

  const getExercises = async () => {
    setLoading(true);
    try {
      const response = await FioApi.get("/exercises");
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
      const response = await FioApi.get(`/exercises/${id}`);
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
      const response = await FioApi.get(
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
