import { useRouter } from "next/router";
import { useState } from "react";
import LoadingIcon from "../../src/components/LoadingIcon";
import PacienteAvatar from "../../src/components/PacienteAvatar";
import { AddButton } from "../../src/components/atoms/Buttons";
import { Box } from "../../src/components/atoms/layouts";
import { Paragraph, Title } from "../../src/components/atoms/typograph";
import { SearchInput } from "../../src/components/molecules/SearchInput";
import { Modals } from "../../src/components/molecules/modals";
import { NewPatientModal } from "../../src/components/organisms/newPartientModal";
import { usePatients } from "../../src/hooks/usePatients";
export default function Pacientes() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { Patients, isLoading } = usePatients();

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
      padding="2rem"
    >
      <Modals
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Adicionar paciente"
      >
        <NewPatientModal onClose={() => setShowModal(false)} />
      </Modals>

      <Box
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap="1rem"
      >
        <Title withBackground>Seus Pacientes</Title>
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
        justifyContent="center"
      >
        {isLoading && <LoadingIcon />}

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