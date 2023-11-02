import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { usePatients } from "../../../hooks/usePatients";
import { Patient } from "../../../types";
import LoadingIcone from "../../LoadingIcone";
import PacienteAvatar from "../../PacienteAvatar";
import { Box } from "../../atoms/layouts";
import { Paragraph, Title } from "../../atoms/typograph";
import { DefaultButton } from "../../molecules/Buttons";
import { Input } from "../../molecules/forms";

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
        <Title size="small">Novo Paciente</Title>

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
      <Title size="small">Procurar Paciente</Title>

      <Box
        alignItems="flex-end"
        gap="1rem"
        justifyContent="center"
        width="100%"
        flexWrap="wrap"
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
            if (!email || !email.includes("@")) return;

            setLoadingPatient(true);
            const response = await searchPatient(email);
            if (!response) setCreateMode(true);
            setPatient(response);
            setLoadingPatient(false);
          }}
          text="Procurar"
          type="submit"
          disabled={!email || !email.includes("@")}
          icon={<BsSearch />}
          width="100%"
        />
      </Box>

      {loadingPatient && (
        <Box width="100%" justifyContent="center" alignItems="center">
          <LoadingIcone />
        </Box>
      )}

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
            direction="column"
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
