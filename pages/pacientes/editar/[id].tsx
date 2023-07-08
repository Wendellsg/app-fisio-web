import { Box } from "../../../src/components/atoms/layouts";
import { HilightedText } from "../../../src/components/atoms/typograph";
import { useRouter } from "next/router";
import { PatientForm } from "../../../src/components/PatientForm";
import { usePatients } from "../../../src/hooks/usePatients";
import { useEffect, useState } from "react";

const EditPatient = () => {
  const router = useRouter();
  const { id } = router.query;
  const [patientData, setPatientData] = useState(null);

  const { getPatientData } = usePatients();

  useEffect(() => {
    if (id) {
      getPatientData(id as string).then((data) => {
        setPatientData(data);
      });
    }
  }, [id]);

  return (
    <Box width="100%" flexDirection="column" gap="1rem">
      <HilightedText size="medium">Editar Paciente</HilightedText>
      <PatientForm edit patienteData={patientData} />
    </Box>
  );
};

export default EditPatient;
