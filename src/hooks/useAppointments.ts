import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TAppointment } from "../types";
import { useApi } from "./Apis";

export const useAppointments = () => {
  const {
    data: appointments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointment(),
    staleTime: 1000 * 60 * 10,
  });
  const { fisioFetcher } = useApi();

  const getAppointment = async () => {
    return await fisioFetcher({
      url: `/appointments/doctor`,
      method: "GET",
    });
  };

  const createAppointment = async (data: Partial<TAppointment>) => {
    await fisioFetcher({
      url: `/appointments`,
      method: "POST",
      data,
      callback: () => {
        refetch();
        toast.success("Agendamento criado com sucesso");
      },
    });
  };

  const updateAppointment = async (id: string, data: Partial<TAppointment>) => {
    await fisioFetcher({
      url: `/appointments/${id}`,
      method: "PATCH",
      data,
      callback: () => {
        refetch();
        toast.success("Agendamento atualizado com sucesso");
      },
    });
  };

  const deleteAppointment = async (id: string) => {
    await fisioFetcher({
      url: `/appointments/${id}`,
      method: "DELETE",
      callback: () => {
        refetch();
        toast.success("Agendamento removido com sucesso");
      },
    });
  };

  return {
    appointments: appointments || ([] as TAppointment[]),
    isLoading,
    refetch,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
};
