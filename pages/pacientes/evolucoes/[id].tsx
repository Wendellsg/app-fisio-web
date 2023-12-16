import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdAddCircleOutline, MdDelete } from "react-icons/md";
import { Avatar } from "../../../src/components/Avatar";
import { Box } from "../../../src/components/atoms/layouts";
import { Paragraph, Title } from "../../../src/components/atoms/typograph";
import { DefaultButton } from "../../../src/components/molecules/Buttons";
import { Modals } from "../../../src/components/molecules/modals";
import { EvolutionForm } from "../../../src/components/organisms/EvolutionForm";
import { useEvolutions } from "../../../src/hooks/useEvolutions";
import { usePatients } from "../../../src/hooks/usePatients";

export default function EvolutionsPage() {
  const [selectedEvolution, setSelectedEvolution] = useState<any>(null);

  const router = useRouter();
  const { id } = router.query;

  const { Patients, refetch } = usePatients();

  const patient = Patients?.find((_patient) => _patient._id === id);

  const { evolutions, deleteEvolution } = useEvolutions();

  const patientEvolutions = evolutions?.filter(
    (evolution) => evolution.patientId === id
  );

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
        isOpen={!!selectedEvolution}
        onClose={() => setSelectedEvolution(null)}
        title={
          selectedEvolution?._id ? `Evolução de ${patient?.name}` : "Evolução"
        }
      >
        <EvolutionForm
          evolution={selectedEvolution}
          onSubmit={() => {
            refetch();
            setSelectedEvolution(null);
          }}
          onCancel={() => setSelectedEvolution(null)}
        />
      </Modals>

      <Box
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap="1rem"
      >
        <Title withBackground>Evoluções do paciente</Title>

        <DefaultButton
          onClick={() =>
            setSelectedEvolution({
              patientId: id,
            })
          }
          text="Nova evolução"
          type="submit"
          icon={<MdAddCircleOutline color="white" />}
        />
      </Box>

      <Box alignItems="center" margin="2rem 0" gap="1rem">
        <Avatar src={patient?.image} size="small" />

        <Paragraph fontWeight="bold" size="md">
          {patient?.name}
        </Paragraph>
      </Box>

      <Box width="100%" flexDirection="column" gap="1rem" margin="1rem 0">
        {patientEvolutions?.length === 0 && (
          <Paragraph fontWeight="bold" size="md">
            Nenhuma evolução cadastrada
          </Paragraph>
        )}

        {patientEvolutions?.map((evolution, index) => {
          return (
            <Box
              key={index}
              width="100%"
              flexDirection="column"
              gap="1rem"
              padding="1rem"
              borderRadius="10px"
              minHeight="fit-content"
              style={{
                border: "1px solid #ccc",
              }}
            >
              <Box width="100%" justifyContent="space-between" margin="10px 0">
                <Paragraph fontWeight="bold" size="sm">
                  {format(
                    utcToZonedTime(new Date(evolution.date), "utc"),
                    "dd/MM/yyyy"
                  )}
                </Paragraph>

                <Box gap="1rem">
                  <DefaultButton
                    onClick={() => deleteEvolution(evolution._id)}
                    text=""
                    icon={<MdDelete color="white" />}
                    type="negation"
                    confirmation
                  />
                  <DefaultButton
                    onClick={() => setSelectedEvolution(evolution)}
                    text="Editar"
                    type="neutral"
                  />
                </Box>
              </Box>

              <Paragraph size="xs" fontWeight="bold" withBackground>
                Diagnostico Clínico
              </Paragraph>

              <Paragraph
                size="sm"
                style={{
                  borderBottom: "1px solid #ccc",
                  width: "100%",
                  paddingBottom: "10px",
                }}
              >
                {evolution.clinicalDiagnosis}
              </Paragraph>

              <Paragraph size="xs" fontWeight="bold" withBackground>
                Diagnostico Fisioterapêutico
              </Paragraph>
              <Paragraph
                size="sm"
                style={{
                  borderBottom: "1px solid #ccc",
                  width: "100%",
                  paddingBottom: "10px",
                }}
              >
                {evolution.physicalDiagnosis}
              </Paragraph>
              <Paragraph size="xs" fontWeight="bold" withBackground>
                Evolução
              </Paragraph>
              <Paragraph
                size="sm"
                style={{
                  borderBottom: "1px solid #ccc",
                  width: "100%",
                  paddingBottom: "10px",
                }}
              >
                {evolution.evolution}
              </Paragraph>
            </Box>
          );
        })}
      </Box>

      <Box />
    </Box>
  );
}
