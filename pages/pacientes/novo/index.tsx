import { Box } from "../../../src/components/atoms/layouts";
import { HilightedText } from "../../../src/components/atoms/typograph";
import { useRouter } from "next/router";
import { PatientForm } from "../../../src/components/PatientForm";

const NewPatient = () => {
  const router = useRouter();

  return (
    <Box>
      <HilightedText size="large">Editar Paciente</HilightedText>
      <PatientForm />
    </Box>
  );
};

export default NewPatient;
