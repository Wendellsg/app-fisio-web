/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState } from "react";
import { Avatar } from "../../src/components/Avatar";
import HomeDashboardBadges from "../../src/components/HomeDashboardBadges";
import LastNewsCard from "../../src/components/LastNewsCard";
import PacienteAvatar from "../../src/components/PacienteAvatar";
import { Box } from "../../src/components/atoms/layouts";
import {
  HilightedText,
  Paragraph,
  Title,
} from "../../src/components/atoms/typograph";
import useWindowDimensions from "../../src/functions/useWindowDimensions";
import { useAuth } from "../../src/hooks/useAuth";
import { usePatients } from "../../src/hooks/usePatients";
import { useUserData } from "../../src/hooks/useUserData";
import * as S from "../../styles/Home.styles";
export default function Home() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { logout } = useAuth();
  const { userData } = useUserData();
  const { Patients } = usePatients();
  const router = useRouter();
  const { width } = useWindowDimensions();

  return (
    <Box
      flexDirection="column"
      width="100%"
      justifyContent="space-between"
      gap="2rem"
      overflow="auto"
    >
      <Box width="100%" justifyContent="space-between" padding="1rem">
        <Box flexDirection="column">
          <Title color="black" size={width > 768 ? "xl" : "lg"}>
            Olá,
          </Title>
          <Title color="black" size={width > 768 ? "xl" : "lg"}>
            {userData?.name}
          </Title>
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
            <HilightedText>Últimos Pacientes</HilightedText>
            <S.HomeLastPacientesList
              style={{
                marginBottom: width > 768 ? "0" : "60px",
              }}
            >
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
        </S.HomeContentSection1>
        {width > 768 && (
          <S.HomeContentSection2>
            <Paragraph fontWeight="bold">Novidades</Paragraph>
            <S.HomeNewsList>
              <LastNewsCard />
              <LastNewsCard />
              <LastNewsCard />
              <LastNewsCard />
            </S.HomeNewsList>
          </S.HomeContentSection2>
        )}
      </Box>
    </Box>
  );
}
