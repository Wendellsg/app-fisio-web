import { useEffect, useState } from "react";
import { Input } from "../../molecules/forms";
import { Box } from "../../atoms/layouts";
import { HilightedText, Paragraph } from "../../atoms/typograph";
import { DefaultButton } from "../../molecules/Buttons";
import { BsSearch } from "react-icons/bs";
import { usePatients } from "../../../hooks/usePatients";
import LoadingIcone from "../../LoadingIcone";
import PacienteAvatar from "../../PacienteAvatar";
import { Patient } from "../../../types";

export const NewPatientModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [patient, setPatient] = useState(null);
  const [loadingPatient, setLoadingPatient] = useState(false);
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({});
  const [creatingPatient, setCreatingPatient] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const { searchPatient, addPatient, createPatient } = usePatients();

  const [createMode, setCreateMode] = useState(false);

  useEffect(() => {
    return () => {
      setPatient({} as Partial<Patient>);
      setEmail("");
      setCreateMode(false);
    };
  }, []);

  if (createMode)
    return (
      <Box width="500px" flexDirection="column" gap="1rem" padding="2rem">
        <HilightedText size="small">Novo Paciente</HilightedText>

        <Paragraph fontWeight="bold" size="xs">
          O paciente não foi encontrado, deseja criar um novo paciente?
        </Paragraph>

        <Input
          label="Nome do paciente"
          onChange={(e) =>
            setNewPatient({ ...newPatient, name: e.target.value })
          }
          value={newPatient.name}
          type="text"
          name="name"
          width="100%"
          placeholder="Digite o nome do paciente"
          error={errors.name}
        />
        <Input
          label="Email do paciente"
          onChange={(e) =>
            setNewPatient({ ...newPatient, email: e.target.value })
          }
          value={newPatient.email}
          type="email"
          name="email"
          width="100%"
          placeholder="Digite o Email do paciente"
          error={errors.email}
        />

        <Box
          width="100%"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
          margin="2rem 0 0 0"
        >
          <DefaultButton
            text="Cancelar"
            type="negation"
            onClick={() => {
              setCreateMode(false);
            }}
            width="100px"
          />
          <DefaultButton
            text="Criar"
            type="submit"
            width="100px"
            onClick={async () => {
              if (!newPatient.name) {
                setErrors({ ...errors, name: "Campo obrigatório" });
                return;
              }
              if (!newPatient.email) {
                setErrors({ ...errors, email: "Campo obrigatório" });
                return;
              }
              setCreatingPatient(true);
              await createPatient(newPatient);
              setCreatingPatient(false);
              setErrors({});
              onClose();
            }}
          />
        </Box>
      </Box>
    );

  return (
    <Box width="500px" flexDirection="column" gap="1rem" padding="2rem">
      <HilightedText size="small">Procurar Paciente</HilightedText>

      <Box
        alignItems="flex-end"
        gap="1rem"
        justifyContent="center"
        width="100%"
      >
        <Input
          label="Email do paciente"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          name="email"
          width="100%"
          placeholder="Digite o email do paciente"
        />

        <DefaultButton
          onClick={async () => {
            if (!email) return;
            setLoadingPatient(true);
            const response = await searchPatient(email);
            if (!response) setCreateMode(true);
            setPatient(response);
            setLoadingPatient(false);
          }}
          text="Procurar"
          type="submit"
          icon={<BsSearch />}
        />
      </Box>

      {loadingPatient && <LoadingIcone />}

      {patient?._id && (
        <Box
          width="100%"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
          margin="2rem 0 0 0"
        >
          <PacienteAvatar
            key={patient._id}
            index={1}
            image={patient.image}
            name={patient.name}
            id={patient._id}
            direction="row"
          />

          <DefaultButton
            text="Adicionar"
            type="submit"
            onClick={() => {
              addPatient(patient._id);
              onClose();
            }}
          />
        </Box>
      )}
    </Box>
  );
};
