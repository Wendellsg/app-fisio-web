/* eslint-disable @next/next/no-img-element */
import { startOfToday } from "date-fns";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { Avatar } from "../../src/components/Avatar";
import HomeDashboardBadges from "../../src/components/HomeDashboardBadges";
import LastNewsCard from "../../src/components/LastNewsCard";
import LoadingIcon from "../../src/components/LoadingIcon";
import PacienteAvatar from "../../src/components/PacienteAvatar";
import { Box } from "../../src/components/atoms/layouts";
import { Paragraph, Title } from "../../src/components/atoms/typograph";
import { Appointment } from "../../src/components/organisms/appointment";
import useWindowDimensions from "../../src/functions/useWindowDimensions";
import { useAppointments } from "../../src/hooks/useAppointments";
import { useAuth } from "../../src/hooks/useAuth";
import { usePatients } from "../../src/hooks/usePatients";
import { useUserData } from "../../src/hooks/useUserData";
import { getAppointments } from "../../src/utils/appointments";
import * as S from "../../styles/Home.styles";
export default function Home() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { logout } = useAuth();
  const { userData } = useUserData();
  const { Patients, isLoading: LoadingPatients } = usePatients();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const today = startOfToday();
  const { appointments } = useAppointments();
  const appointmentsOfDay = getAppointments(today, appointments || []);
  const sortedAppointments = useMemo(
    () =>
      appointmentsOfDay.sort((a, b) => {
        const aDate = new Date(a.startDate);
        const bDate = new Date(b.startDate);
        return aDate.getTime() - bDate.getTime();
      }),
    [appointmentsOfDay]
  );

  return (
    <Box
      flexDirection="column"
      width="100%"
      justifyContent="space-between"
      gap="2rem"
      maxWidth="100%"
      style={{
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Box width="100%" justifyContent="space-between" padding="1rem">
        <Box flexDirection="column">
          <HomeTitle color="black">Olá,</HomeTitle>
          <HomeTitle color="black">{userData?.name}</HomeTitle>
        </Box>
        <Box
          style={{
            position: "relative",
            overflow: "hidden",
          }}
          height="200px"
          width="200px"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
        >
          <S.ProfileMenuList isMenuOpen={!showProfileMenu}>
            <S.ProfileMenuItem
              padding="2px 10px"
              borderRadius="15px"
              onClick={() => router.push("/profile")}
            >
              <Paragraph fontWeight="bold">Ver Perfil</Paragraph>
            </S.ProfileMenuItem>
            <S.ProfileMenuItem
              padding="2px 10px"
              borderRadius="15px"
              onClick={() => router.push("/profile/editar")}
            >
              <Paragraph fontWeight="bold">Editar perfil</Paragraph>
            </S.ProfileMenuItem>
            <S.ProfileMenuItem padding="2px 10px" borderRadius="15px">
              <Paragraph onClick={logout} fontWeight="bold">
                Sair
              </Paragraph>
            </S.ProfileMenuItem>
          </S.ProfileMenuList>
          <Avatar
            src={userData?.image}
            size="medium"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
            }}
          />
        </Box>
      </Box>
      <Box width="100%" justifyContent="space-between">
        <S.HomeContentSection1>
          <HomeDashboardBadges />
          <S.HomeLastPacientes>
            <Title
              withBackground
              maxWidth="fit-content"
              style={{
                marginLeft: "1rem",
              }}
            >
              Últimos Pacientes
            </Title>
            <S.HomeLastPacientesList>
              {LoadingPatients && <LoadingIcon />}

              {Patients?.map((paciente, index) => {
                return (
                  <PacienteAvatar
                    key={index}
                    image={paciente.image}
                    name={paciente.name}
                    index={index}
                    id={paciente._id}
                    onClick={() => router.push(`/pacientes/${paciente._id}`)}
                  />
                );
              })}
            </S.HomeLastPacientesList>
          </S.HomeLastPacientes>

          <Box flexDirection="column" gap="1rem" maxWidth="100%">
            <Title
              withBackground
              maxWidth="fit-content"
              style={{
                marginLeft: "1rem",
              }}
            >
              Próximas consultas
            </Title>

            <Box
              gap="1rem"
              style={{
                paddingLeft: "1rem",
                overflowX: "auto",
                paddingBottom: "1rem",
                marginTop: "2rem",
              }}
              maxWidth="100%"
              showScrollBar
            >
              {sortedAppointments?.map((appointment) => {
                const patient = Patients?.find(
                  (patient) => patient._id === appointment.patientId
                );

                if (!patient) return null;

                return (
                  <Appointment
                    appointment={appointment}
                    patient={patient}
                    index={() => {
                      const index = sortedAppointments.findIndex(
                        (appointmentOfDay) =>
                          appointmentOfDay._id === appointment._id
                      );
                      return sortedAppointments.length - index;
                    }}
                    key={appointment._id}
                    onClick={() => router.push(`/schedule`)}
                  />
                );
              })}

              {sortedAppointments.length === 0 && (
                <Box
                  width="100%"
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Paragraph>Não há consultas marcadas para hoje</Paragraph>
                </Box>
              )}
            </Box>
          </Box>
        </S.HomeContentSection1>

        <S.HomeContentSection2>
          <Paragraph fontWeight="bold">Novidades</Paragraph>
          <S.HomeNewsList>
            <LastNewsCard />
            <LastNewsCard />
            <LastNewsCard />
            <LastNewsCard />
          </S.HomeNewsList>
        </S.HomeContentSection2>
      </Box>
    </Box>
  );
}

export const HomeTitle = styled(Title)`
  font-size: ${({ theme }) => theme.fontSizes["md"]};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes["lg"]};
  }
`;
