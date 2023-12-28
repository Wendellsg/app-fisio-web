import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaEnvelope, FaRulerVertical, FaWeight } from "react-icons/fa";
import { HiCake } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiEditBoxFill, RiMapPin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { RoutineForm } from "../../src/components/ActivityForm";
import { Avatar } from "../../src/components/Avatar";
import RoutineCard from "../../src/components/RoutineCard";
import { AddButton } from "../../src/components/atoms/Buttons";
import { Box } from "../../src/components/atoms/layouts";
import { Paragraph, Title } from "../../src/components/atoms/typograph";
import { DefaultButton } from "../../src/components/molecules/Buttons";
import { Accordion } from "../../src/components/molecules/accordion";
import { InfoItem } from "../../src/components/molecules/infoItem";
import { Modals } from "../../src/components/molecules/modals";
import { useWindowsDimensions } from "../../src/hooks";
import { useApi } from "../../src/hooks/Apis";
import { usePatient } from "../../src/hooks/usePatients";
import { useUserData } from "../../src/hooks/useUserData";
import { Routine } from "../../src/types";
import { findAge } from "../../src/utils/date";
export default function PacientePage() {
  const router = useRouter();
  const { id } = router.query;
  const { height, width } = useWindowsDimensions();

  const { patientData, refetch } = usePatient(id as string);

  const [newRoutineModalOpen, setNewRoutineModalOpen] =
    useState<boolean>(false);
  const { fisioFetcher } = useApi();
  const { userData } = useUserData();

  const diagnosis = userData?.patients?.find(
    (patient) => patient.userId === id
  ).diagnosis;

  return (
    <>
      <Modals
        isOpen={newRoutineModalOpen}
        onClose={() => setNewRoutineModalOpen(null)}
        title="Nova Rotina"
      >
        <RoutineForm
          routine={{} as Routine}
          onSubmit={async (NewRoutine) => {
            await fisioFetcher({
              url: `/users/${id}/routines`,
              method: "POST",
              data: NewRoutine,
              callback: () => {
                setNewRoutineModalOpen(false);
                toast.success("Rotina criada com sucesso");
                refetch();
              },
            });
          }}
        />
      </Modals>

      <Box
        flexDirection="column"
        width="100%"
        gap="2rem"
        overflow="auto"
        justifyContent="flex-start"
        height="fit-content"
        alignItems="flex-start"
        padding="1rem"
      >
        <Box flexDirection="column" gap="1rem" margin="2rem 0" width="100%">
          <Title withBackground>Paciente</Title>
          <Box style={width && width <= 750 ? { display: "none" } : {}}>
            <Title fontWeight="bold" size="xl" color="black">
              {patientData?.name}
            </Title>
          </Box>
        </Box>
        <Box
          justifyContent="space-between"
          width="100%"
          gap="1rem"
          flexDirection={width && width <= 750 ? "column-reverse" : "row"}
          minHeight="fit-content"
        >
          <Box
            flexDirection="column"
            gap="1rem"
            width="fit-content"
            justifyContent="flex-start"
          >
            <Box flexDirection="column" gap="1rem" margin="3rem 0 0 0">
              <Paragraph fontWeight="bold" size="lg">
                Diagnóstico clínico e funcional
              </Paragraph>
              <Paragraph
                fontWeight="bold"
                maxWidth={width && width <= 750 ? "100%" : "750px"}
              >
                {diagnosis ? diagnosis : "Sem diagnóstico"}
              </Paragraph>
            </Box>

            <Box flexDirection="column" margin="2rem 0 0 0">
              <Box
                alignItems="center"
                width="100%"
                justifyContent="space-between"
                maxWidth={width && width <= 750 ? "100%" : "750px"}
                padding="1rem"
              >
                <Paragraph fontWeight="bold" size="lg">
                  Rotinas
                </Paragraph>
                <AddButton
                  onClick={() => setNewRoutineModalOpen(!newRoutineModalOpen)}
                />
              </Box>
              <Box
                maxWidth={width && width <= 750 ? "100%" : "750px"}
                flexWrap="wrap"
                gap="1rem"
                justifyContent="flex-start"
                margin="1rem 0 0 0"
              >
                {patientData?.routines?.map((routine: Routine) => {
                  return (
                    <RoutineCard
                      key={routine._id}
                      routine={routine}
                      patientId={id as string}
                      updateUser={refetch}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box
            flexDirection="column"
            width={width && width > 750 ? "400px" : "100%"}
            maxWidth="100vw"
            justifyContent="flex-start"
            alignItems="center"
            gap="1rem"
            minHeight="fit-content"
          >
            <Avatar src={patientData?.image} size="large" />
            <DefaultButton
              text="Editar Paciente"
              type="submit"
              onClick={() => router.push(`/pacientes/editar/${id}`)}
              icon={<RiEditBoxFill size={20} />}
            />
            <Box style={width && width > 750 ? { display: "none" } : {}}>
              <Paragraph fontWeight="bold" size="md">
                {patientData?.name}
              </Paragraph>
            </Box>
            <Accordion title="Ver Detalhes">
              <Box width="100%" flexDirection="column" gap="1rem">
                <InfoItem
                  icon={<HiCake size={30} />}
                  text={
                    patientData?.birthDate
                      ? findAge(patientData?.birthDate) + " anos"
                      : "Sem idade"
                  }
                />
                <InfoItem
                  icon={<FaRulerVertical size={30} />}
                  text={
                    patientData?.height
                      ? patientData?.height?.toString() + " cm"
                      : "Sem altura"
                  }
                />
                <InfoItem
                  icon={<FaWeight size={30} />}
                  text={
                    patientData?.weight
                      ? patientData?.weight?.toString() + " Kg"
                      : "Sem peso"
                  }
                />
                <InfoItem
                  icon={<IoLogoWhatsapp size={30} />}
                  text={patientData?.phone || "Sem telefone"}
                />
                <InfoItem
                  icon={<FaEnvelope size={30} />}
                  text={patientData?.email}
                />

                {patientData?.address && (
                  <InfoItem
                    icon={<RiMapPin2Fill size={30} />}
                    iconSize="30px"
                    text={
                      patientData?.address +
                      ", " +
                      patientData?.addressNumber +
                      ", " +
                      patientData?.addressCity +
                      " - " +
                      patientData?.addressState
                    }
                  />
                )}
              </Box>
            </Accordion>

            <Accordion title="Evoluções">
              <Link href={`/pacientes/evolucoes/${id}`}>
                <Paragraph
                  fontWeight="bold"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Ver todas
                </Paragraph>
              </Link>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </>
  );
}
