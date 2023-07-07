import { useState } from "react";
import { User } from "../../types/user";
import { atom, useAtom } from "jotai";
import { useApi } from "../Apis";
import { toast } from "react-toastify";
import { useUserData } from "../useUserData";

const patientAtom = atom<Partial<User>>({} as Partial<User>);
const loadingPatientAtom = atom<boolean>(false);

export const usePatients = () => {
  const [patient, setPatient] = useAtom(patientAtom);
  const [loadingPatient, setLoadingPatient] = useAtom(loadingPatientAtom);
  const { fisioFetcher } = useApi();
  const { getUserdata } = useUserData();

  const searchPatient = async (email: string) => {
    const response = await fisioFetcher({
      url: `/users/by-email/${email}`,
      method: "GET",
      loadingFuntion: setLoadingPatient,
    });

    if (!response) return;
    setPatient(response);
  };

  const addPatient = async (patientId: string) => {
    await fisioFetcher({
      url: `/users/patient`,
      method: "PATCH",
      data: { patientId },
      loadingFuntion: setLoadingPatient,
      callback: () => {
        toast.success("Paciente adicionado com sucesso");
        getUserdata();
      },
    });
  };

  return {
    patient,
    searchPatient,
    loadingPatient,
    addPatient,
  };
};
