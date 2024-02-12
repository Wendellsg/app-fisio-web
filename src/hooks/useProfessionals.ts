"use client";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "./Apis";

export function useProfessionals() {
  const { fisioFetcher } = useApi();

  async function getProfessionals(): Promise<User[] | null> {
    const response = await fisioFetcher({
      url: `/users/professionals`,
      method: "GET",
    });

    if (!response) return null;
    return response;
  }

  const {
    data: professionals,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["professionals"],
    queryFn: () => getProfessionals(),
    staleTime: 1000 * 60 * 10,
  });

  return { professionals, refetch, isLoading };
}
