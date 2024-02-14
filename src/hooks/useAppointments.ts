import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fisioFetcher } from "./Apis";
import { useUserData } from "./useUserData";

export const useAppointments = () => {
  const { userData } = useUserData();

  const endPoint =
    userData?.role === Role.PROFESSIONAL
      ? `/appointments/doctor`
      : `/appointments/patient`;

  const {
    data: appointments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointment(),
    staleTime: 1000 * 60 * 10,
  });

  const getAppointment = async (): Promise<Appointment[]> => {
    return await fisioFetcher({
      url: endPoint,
      method: "GET",
    });
  };

  const createAppointment = async (data: Partial<Appointment>) => {
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

  const updateAppointment = async (id: string, data: Partial<Appointment>) => {
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
    appointments: appointments || ([] as Appointment[]),
    isLoading,
    refetch,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
};
