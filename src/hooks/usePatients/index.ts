import { atom, useAtom } from "jotai";
import { toast } from "react-toastify";
import { Patient } from "../../types/user";
import { useApi } from "../Apis";

const PatientsAtom = atom<Partial<Patient>[]>([]);
export const usePatients = () => {
  const [Patients, setPatients] = useAtom(PatientsAtom);

  const { fisioFetcher } = useApi();
  const searchPatient = async (email: string) => {
    const response = await fisioFetcher({
      url: `/users/by-email/${email}`,
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

  const createPatient = async (patient: Partial<Patient>) => {
    const response = await fisioFetcher({
      url: `/users/patients`,
      method: "POST",
      data: patient,
      callback: () => {
        toast.success("Paciente criado com sucesso");
      },
    });

    if (response) {
      await addPatient(response._id);
    }
  };

  const getPatients = async () => {
    const response = await fisioFetcher({
      url: `/users/patients`,
      method: "GET",
    });

    if (!response) return false;
    setPatients(response);
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

  const updatePatient = async (
    patient: Partial<Patient>,
    diagnosis: string
  ) => {
    const response = await fisioFetcher({
      url: `/users/patients/${patient._id}`,
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
    Patients,
    getPatientData,
    updatePatient,
  };
};
