/* eslint-disable @next/next/no-img-element */
import * as S from "../../styles/Home.styles";
import { useState } from "react";
import HomeDashboardBadges from "../../src/components/HomeDashboardBadges";
import PacienteAvatar from "../../src/components/PacienteAvatar";
import LastNewsCard from "../../src/components/LastNewsCard";
import { Box } from "../../src/components/atoms/layouts";
import { useAuth } from "../../src/hooks/useAuth";
import { useUserData } from "../../src/hooks/useUserData";
import { HilightedText, Paragraph, Title } from "../../src/components/atoms/typograph";
import { Avatar } from "../../src/components/Avatar";
import { useRouter } from "next/router";
import useWindowDimensions from "../../src/functions/useWindowDimensions";
export default function Home() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { logout } = useAuth();
  const { userData } = useUserData();
  const router = useRouter();
  const { width } = useWindowDimensions();

  return (
    <Box
      flexDirection="column"
      width="100%"
      justifyContent="space-between"
      gap="2rem"
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
            <HilightedText>Ultimos Pacientes</HilightedText>
            <S.HomeLastPacientesList>
              <PacienteAvatar
                image={"/assets/thais.webp"}
                name="Juliana Queiroz"
                index={1}
                id={"wapdokpo"}
              />
              <PacienteAvatar
                image={"/assets/thais.webp"}
                name="Juliana Queiroz"
                index={2}
                id={"wapdokpo"}
              />
              <PacienteAvatar
                image={"/assets/thais.webp"}
                name="Juliana Queiroz"
                index={3}
                id={"wapdokpo"}
              />
              <PacienteAvatar
                image={"/assets/thais.webp"}
                name="Juliana Queiroz"
                index={4}
                id={"wapdokpo"}
              />
              <PacienteAvatar
                image={"/assets/thais.webp"}
                name="Juliana Queiroz"
                index={5}
                id={"wapdokpo"}
              />
              <PacienteAvatar
                image={"/assets/thais.webp"}
                name="Juliana Queiroz"
                index={6}
                id={"wapdokpo"}
              />
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
