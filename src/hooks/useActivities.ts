import { useAtom } from "jotai";
import { useApi } from "./Apis";
import { activitiesAtom, patientActivitiesAtom } from "./states";
import { useFeedBack } from "./useFeedback";

export const useActivities = () => {
  const [activities, setActivities] = useAtom(activitiesAtom);
  const [patientActivities, setPatientActivities] = useAtom(
    patientActivitiesAtom
  );
  const { feedBack, loading } = useFeedBack();

  const { FioApi } = useApi();

  const getPatientActivities = async (pacientId: string) => {
    loading("Carregando atividades...");
    try {
      const response = await FioApi.get(`/activities?pacientId=${pacientId}`);
      setPatientActivities(response.data);
      feedBack("success", "Atividades carregadas com sucesso!");
    } catch (error) {
      feedBack("error", "Não foi possível carregar as atividades do paciente!");
    }
  };

  const getActivities = async () => {
    loading("Carregando atividades...");
    try {
      const response = await FioApi.get(`/activities`);
      setActivities(response.data);
      feedBack("success", "Atividades carregadas com sucesso!");
    } catch (error) {
      feedBack("error", "Não foi possível carregar as atividades!");
    }
  };

  return {
    activities,
    patientActivities,
    getActivities,
    getPatientActivities,
  };
};
