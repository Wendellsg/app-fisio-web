/* eslint-disable @next/next/no-img-element */
import * as S from "../../styles/Home.styles";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import HomeDashboardBadges from "../../src/components/HomeDashboardBadges";
import PacienteAvatar from "../../src/components/PacienteAvatar";
import LastNewsCard from "../../src/components/LastNewsCard";
import { Box } from "../../src/components/atoms/layouts";
import { useAuth } from "../../src/hooks/useAuth";
import { useUserData } from "../../src/hooks/useUserData";
export default function Home() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { logout } = useAuth();
  const { userData } = useUserData();

  return (
    <Box
      flexDirection="column"
      width="100%"
      justifyContent="space-between"
      gap="2rem"
    >
      <Box width="100%" justifyContent="space-between">
        <S.ProfileUserName>
          <h1>Olá,</h1>
          <h1>{userData?.name}</h1>
        </S.ProfileUserName>
        <S.ProfileMenu>
          <S.ProfileImageBorder
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <S.ProfileImageBackground>
              <img
                alt="imagem de perfil"
                src={userData?.image}
                style={{
                  position: "relative",
                  top: 0,
                  left: 0,
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  width: "100%",
                }}
              />
            </S.ProfileImageBackground>
          </S.ProfileImageBorder>
          <S.ProfileMenuList isMenuOpen={showProfileMenu}>
            <ul>
              <Link href="/profile">
                <li>Ver Perfil</li>
              </Link>
              <Link href="/profile/edite">
                <li>Editar perfil</li>
              </Link>
              <li onClick={logout}>Sair</li>
            </ul>
          </S.ProfileMenuList>
        </S.ProfileMenu>
      </Box>
      <Box width="100%" justifyContent="space-between">
        <S.HomeContentSection1>
          <HomeDashboardBadges />
          <S.HomeLastPacientes>
            <h2>Ultimos Pacientes</h2>
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
        <S.HomeContentSection2>
          <S.HomeNewsTitle>Novidades</S.HomeNewsTitle>
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
