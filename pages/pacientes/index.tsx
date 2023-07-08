import { useState, useEffect } from "react";
import PacienteAvatar from "../../src/components/PacienteAvatar";
import { useRouter } from "next/router";
import { Box } from "../../src/components/atoms/layouts";
import { SearchInput } from "../../src/components/molecules/SearchInput";
import { AddButton } from "../../src/components/atoms/Buttons";
import { HilightedText, Paragraph } from "../../src/components/atoms/typograph";
import { Modals } from "../../src/components/molecules/modals";
import { NewPatientModal } from "../../src/components/organisms/newPartientModal";
import { useUserData } from "../../src/hooks/useUserData";
import { usePatients } from "../../src/hooks/usePatients";
export default function Pacientes() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { Patients } = usePatients();

  const patientsFiltered = Patients?.filter((patient) => {
    return patient.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <Box
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      width="100%"
      height="100%"
      gap="2rem"
    >
      <Modals isOpen={showModal} onClose={() => setShowModal(false)}>
        <NewPatientModal onClose={() => setShowModal(false)} />
      </Modals>

      <Box width="100%" alignItems="center" justifyContent="space-between">
        <HilightedText>Seus Pacientes</HilightedText>
        <Box>
          <SearchInput
            action={(e) => setSearchInput(e)}
            placeholder="Pesquisar Paciente..."
          />
          <AddButton onClick={() => setShowModal(true)} />
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="wrap"
        gap="1.5rem"
        margin="2rem 0"
        maxHeight="90vh"
        overflow="auto"
        padding="1rem"
      >
        {patientsFiltered?.length > 0 ? (
          patientsFiltered?.map((pacinte, index) => {
            return (
              <PacienteAvatar
                key={pacinte._id}
                index={index}
                image={pacinte.image}
                name={`${pacinte.name}`}
                id={pacinte._id}
                onClick={() => router.push(`/pacientes/${pacinte._id}`)}
              />
            );
          })
        ) : (
          <Paragraph>Nenhum Paciente encontrado</Paragraph>
        )}
      </Box>
    </Box>
  );
}
