import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useApi } from "../Apis";

export const usePatients = () => {
  const {
    data: Patients,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: () => getPatients(),
    staleTime: 1000 * 60 * 10,
  });

  const { fisioFetcher } = useApi();
  const searchPatient = async (email: string) => {
    const response = await fisioFetcher({
      url: `/users/search?email=${email}`,
      method: "GET",
    });

    if (!response) return false;
    return response;
  };

  const addPatient = async (patientId: string) => {
    await fisioFetcher({
      url: `/users/patients`,
      method: "PATCH",
      data: { patientId },
      callback: () => {
        toast.success("Paciente adicionado com sucesso");
        getPatients();
      },
    });
  };

  const createPatient = async (patient: Partial<User>) => {
    const response = await fisioFetcher({
      url: `/users`,
      method: "POST",
      data: { ...patient, byProfessional: true },
      callback: () => {
        toast.success("Paciente criado com sucesso");
        refetch();
      },
    });

    if (response) {
      await addPatient(response.id);
    }
  };

  const removePatient = async (patientId: string) => {
    await fisioFetcher({
      url: `/users/patients/${patientId}`,
      method: "DELETE",
      callback: () => {
        toast.success("Paciente removido com sucesso");
        refetch();
      },
    });
  };

  const getPatients = async (): Promise<User[] | null> => {
    const response = await fisioFetcher({
      url: `/users/patients`,
      method: "GET",
    });

    if (!response) return null;
    return response;
  };

  const getPatientData = async (patientId: string) => {
    const response = await fisioFetcher({
      url: `/users/patients/${patientId}`,
      method: "GET",
    });

    if (!response) return false;
    return response;
  };

  const updatePatient = async (patient: Partial<User>, diagnosis: string) => {
    const response = await fisioFetcher({
      url: `/users/patients/${patient.id}`,
      method: "PATCH",
      data: { patient, diagnosis },
      callback: () => {
        toast.success("Paciente atualizado com sucesso");
        getPatients();
      },
    });

    if (!response) return false;
    return response;
  };

  return {
    searchPatient,
    addPatient,
    getPatients,
    createPatient,
    removePatient,
    Patients,
    getPatientData,
    updatePatient,
    refetch,
    isLoading,
  };
};

export function usePatient(id: string) {
  const { getPatientData } = usePatients();

  const { data: patientData, refetch } = useQuery({
    queryKey: ["patientData", id as string],
    queryFn: () => getPatientData(id as string),
    staleTime: 1000 * 60 * 10,
    enabled: !!id && id !== "undefined" && id !== "",
  });

  return { patientData, refetch };
}
