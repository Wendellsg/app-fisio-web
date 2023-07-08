import { Avatar } from "../../../src/components/Avatar";
import { DefaultButton } from "../../../src/components/molecules/Buttons";
import { useWindowsDimensions } from "../../../src/hooks";
import { BRPhoneMask, BRZipCodeMask, CPFMask } from "../../../src/utils/maskes";
import { FaSave } from "react-icons/fa";
import { Box } from "../../../src/components/atoms/layouts";
import { useState } from "react";
import { Patient } from "../../types";
import { Input, TextArea } from "../molecules/forms";
import { User } from "../../types/user";
import { useUserData } from "../../hooks/useUserData";
import { useRouter } from "next/router";
import { usePatients } from "../../hooks/usePatients";
interface PatientFormProps {
  edit?: boolean;
  patienteData?: Partial<User>;
}

export const PatientForm: React.FC<PatientFormProps> = ({ patienteData }) => {
  const [patient, setPatient] = useState<Partial<User>>(patienteData);
  const { updatePatient } = usePatients();
  const [updating, setUpdating] = useState<boolean>(false);

  const { userData } = useUserData();
  const diagnosis =
    userData?.patients?.find((_patient) => _patient.userId === patient._id)
      ?.diagnosis || "";
  const [newDiagnosis, setNewDiagnosis] = useState<string>(diagnosis || "");
  const { width } = useWindowsDimensions();

  const router = useRouter();

  const handleSave = async () => {
    setUpdating(true);

    await updatePatient(patient, newDiagnosis);

    setUpdating(false);
  };
  return (
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
          src={patient.image}
          alt={patient.name}
          size={width < 768 ? "medium" : "large"}
        />

        <Box gap="1rem" justifyContent="flex-start" flexDirection="column">
          <Box height="fit-content" gap="1rem" flexWrap="wrap">
            <Input
              label="Nome do paciente"
              value={patient.name}
              name="name"
              type="text"
              onChange={() => {}}
              minWidth="15rem"
              placeholder="Nome do paciente"
              disabled
            />

            <Input
              value={patient.email}
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
              value={patient.height}
              label="Altura"
              name="height"
              onChange={(e) =>
                setPatient((prev) => ({
                  ...prev,
                  height: Number(e.target.value),
                }))
              }
              minWidth="10rem"
              type={"number"}
              placeholder="1,80"
            />

            <Input
              value={patient.weight}
              label="Peso"
              name="weight"
              onChange={(e) =>
                setPatient((prev) => ({
                  ...prev,
                  weight: Number(e.target.value),
                }))
              }
              minWidth="10rem"
              type={"number"}
              placeholder="80"
            />
          </Box>

          <Box width="100%" gap="1rem">
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
  );
};
