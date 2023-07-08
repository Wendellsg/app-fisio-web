import { useRouter } from "next/router";
import styles from "./PacientePage.module.css";
import { RiMapPin2Fill, RiEditBoxFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiCake } from "react-icons/hi";
import { FaRulerVertical, FaWeight, FaEnvelope } from "react-icons/fa";
import RotineCard from "../../src/components/RotineCard";
import ActivityCard from "../../src/components/ActivityCard/ActivityCard";
import { useEffect, useState } from "react";
import { useWindowsDimensions } from "../../src/hooks";
import { Box } from "../../src/components/atoms/layouts";
import { usePatients } from "../../src/hooks/usePatients";
import {
  HilightedText,
  Paragraph,
  Title,
} from "../../src/components/atoms/typograph";
import { useUserData } from "../../src/hooks/useUserData";
import { AddButton } from "../../src/components/atoms/Buttons";
import { Avatar } from "../../src/components/Avatar";
import { DefaultButton } from "../../src/components/molecules/Buttons";
import { Accordion } from "../../src/components/molecules/accordion";
import { InfoItem } from "../../src/components/molecules/infoItem";
import { findAge } from "../../src/utils/date";
export default function PacientePage() {
  const router = useRouter();
  const { id } = router.query;
  const { height, width } = useWindowsDimensions();
  const [patientData, setPatientData] = useState(null);
  const { getPatientData } = usePatients();

  const { userData } = useUserData();

  const diagnosis = userData?.patients?.find(
    (patient) => patient.userId === id
  ).diagnosis;

  useEffect(() => {
    if (id) {
      getPatientData(id as string).then((data) => {
        setPatientData(data);
      });
    }

    return () => {
      setPatientData(null);
    };
  }, [id]);

  return (
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
        <HilightedText>Paciente</HilightedText>
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
            >
              <Paragraph fontWeight="bold" size="lg">
                Rotinas
              </Paragraph>
              <AddButton
                onClick={() => router.push(`/pacientes/rotinas/nova/${id}`)}
              />
            </Box>
            <Box
              maxWidth={width && width <= 750 ? "100%" : "750px"}
              flexWrap="wrap"
              gap="1rem"
              justifyContent="flex-start"
            >
              <RotineCard />
              <RotineCard />
              <RotineCard />
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

          <Accordion title="Ultimas Atividades">
            <Box
              flexDirection="column"
              minHeight="fit-content"
              justifyContent="flex-start"
              gap="1rem"
            >
              <ActivityCard index={1} activity={""} />
              <ActivityCard index={1} activity={""} />
              <ActivityCard index={1} activity={""} />
              <ActivityCard index={1} activity={""} />
              <ActivityCard index={1} activity={""} />
              <ActivityCard index={1} activity={""} />
            </Box>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
}
