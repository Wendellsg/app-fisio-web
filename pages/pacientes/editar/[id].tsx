import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { Avatar } from "../../../src/components/Avatar";
import LoadingIcone from "../../../src/components/LoadingIcone";
import { Box } from "../../../src/components/atoms/layouts";
import {
  HilightedText,
  Paragraph,
} from "../../../src/components/atoms/typograph";
import { DefaultButton } from "../../../src/components/molecules/Buttons";
import { Input, TextArea } from "../../../src/components/molecules/forms";
import { useWindowsDimensions } from "../../../src/hooks";
import { usePatients } from "../../../src/hooks/usePatients";
import { useUserData } from "../../../src/hooks/useUserData";

const EditPatient = () => {
  const [patientData, setPatientData] = useState(null);
  const [loadingPatient, setLoadingPatient] = useState<boolean>(true);

  const { updatePatient } = usePatients();
  const [updating, setUpdating] = useState<boolean>(false);

  const { userData } = useUserData();

  const { width } = useWindowsDimensions();

  const router = useRouter();

  const { id } = router.query;

  const diagnosis =
    userData?.patients?.find((_patient) => _patient.userId === id)?.diagnosis ||
    "";

  const [newDiagnosis, setNewDiagnosis] = useState<string>(diagnosis || "");

  const handleSave = async () => {
    setUpdating(true);

    await updatePatient(patientData, newDiagnosis);

    setUpdating(false);
  };

  const { getPatientData } = usePatients();

  useEffect(() => {
    if (id) {
      setLoadingPatient(true);
      getPatientData(id as string).then((data) => {
        setPatientData(data);
        setLoadingPatient(false);
      });
    }

    return () => {
      setPatientData(null);
    };
  }, []);

  if (!patientData || loadingPatient) {
    return (
      <Box
        width="100%"
        flexDirection="column"
        gap="1rem"
        padding="2rem 2rem 0 2rem"
        alignItems="center"
        justifyContent="center"
      >
        <LoadingIcone />
        <Paragraph fontWeight="bold">
          Carregando dados do paciente, por favor aguarde...
        </Paragraph>
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      flexDirection="column"
      gap="1rem"
      padding="2rem"
      overflow="auto"
    >
      <HilightedText size="medium">Editar Paciente</HilightedText>
      <Box
        gap="1rem"
        alignItems="flex-start"
        width="fit-content"
        margin="2rem auto"
      >
        <Box
          gap="2rem"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            src={patientData.image}
            alt={patientData.name}
            size={width < 768 ? "medium" : "large"}
          />

          <Box gap="1rem" justifyContent="flex-start" flexDirection="column">
            <Box height="fit-content" gap="1rem" flexWrap="wrap">
              <Input
                label="Nome do paciente"
                value={patientData.name}
                name="name"
                type="text"
                onChange={() => {}}
                minWidth="15rem"
                placeholder="Nome do paciente"
                disabled
              />

              <Input
                value={patientData.email}
                name="email"
                label="E-mail do paciente"
                onChange={() => {}}
                minWidth="15rem"
                type={"email"}
                placeholder="E-mail do paciente"
                disabled
              />
            </Box>
            <Box height="fit-content" gap="1rem" flexWrap="wrap" width="100%">
              <TextArea
                value={newDiagnosis}
                name="Diagnóstico"
                label="Diagnóstico"
                onChange={(e) => setNewDiagnosis(e.target.value)}
                placeholder="Diagnóstico do paciente (Só será visível para você)"
                width="100%"
              />
            </Box>
            <Box height="fit-content" gap="1rem" flexWrap="wrap">
              <Input
                value={patientData.height}
                label="Altura"
                name="height"
                onChange={(e) =>
                  setPatientData((prev) => ({
                    ...prev,
                    height: Number(e.target.value),
                  }))
                }
                minWidth="10rem"
                type={"number"}
                placeholder="1,80"
              />

              <Input
                value={patientData.weight}
                label="Peso"
                name="weight"
                onChange={(e) =>
                  setPatientData((prev) => ({
                    ...prev,
                    weight: Number(e.target.value),
                  }))
                }
                minWidth="10rem"
                type={"number"}
                placeholder="80"
              />
            </Box>

            <Box width="100%" gap="1rem" margin="0 0 2rem 0">
              <DefaultButton
                onClick={() => router.back()}
                text="Cancelar"
                width="100%"
                type="negation"
              />
              <DefaultButton
                onClick={handleSave}
                icon={<FaSave />}
                text="Salvar"
                width="100%"
                type="submit"
                isLoading={updating}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPatient;
