import { Box } from "../../../src/components/atoms/layouts";
import { HilightedText } from "../../../src/components/atoms/typograph";
import { useRouter } from "next/router";
import { PatientForm } from "../../../src/components/PatientForm";
import { mockedPatient } from "../../../src/mock/Paciente";

const EditPatient = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box>
      <HilightedText size="large">Editar Paciente</HilightedText>
      <PatientForm edit patienteData={mockedPatient} />
    </Box>
  );
};

export default EditPatient;
