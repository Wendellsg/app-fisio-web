import { useState } from "react";
import { Input } from "../../molecules/forms";
import { Box } from "../../atoms/layouts";
import { HilightedText, Paragraph } from "../../atoms/typograph";
import { DefaultButton } from "../../molecules/Buttons";
import { BsSearch } from "react-icons/bs";
import { usePatients } from "../../../hooks/usePatients";
import LoadingIcone from "../../LoadingIcone";
import PacienteAvatar from "../../PacienteAvatar";

export const NewPatientModal = () => {
  const [email, setEmail] = useState("");
  const { loadingPatient, patient, searchPatient, addPatient } = usePatients();

  return (
    <Box width="500px" flexDirection="column" gap="1rem" padding="2rem">
      <HilightedText size="small">Novo Paciente</HilightedText>

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
          onClick={() => {
            searchPatient(email);
          }}
          text="Procurar"
          type="submit"
          icon={<BsSearch />}
        />
      </Box>

      {loadingPatient && <LoadingIcone />}

      {patient._id && (
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
            onClick={() => addPatient(patient._id)}
          />
        </Box>
      )}
    </Box>
  );
};
