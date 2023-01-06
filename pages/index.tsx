import * as S from "../styles/Home.styles";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import HomeDashboardBadges from "../src/components/HomeDashboardBadges";
import PacienteAvatar from "../src/components/PacienteAvatar";
import LastNewsCard from "../src/components/LastNewsCard";
export default function Home() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  return (
    <S.Container>
      <S.ProfileContainer>
        <S.ProfileUserName>
          <h1>Olá,</h1>
          <h1>Dra. Thais Passos</h1>
        </S.ProfileUserName>
        <S.ProfileMenu>
          <S.ProfileImageBorder
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <S.ProfileImageBackground>
              <Image
                alt="imagem de perfil"
                width={76}
                height={76}
                layout={"intrinsic"}
                src={"/assets/thais.webp"}
                style={{
                  position: "relative",
                  top: 0,
                  left: 0,
                  borderRadius: "50%",
                  border: "2px solid #fff",
                }}
              />
            </S.ProfileImageBackground>
          </S.ProfileImageBorder>
          <S.ProfileMenuList>
            <ul>
              <Link href="/profile">
                <li
                  className={
                    showProfileMenu
                      ? "slide-bottom"
                      : showProfileMenu === false
                      ? "slide-top"
                      : "displayNone"
                  }
                >
                  Ver Perfil
                </li>
              </Link>
              <Link href="/profile/edite">
                <li
                  className={
                    showProfileMenu
                      ? "slide-bottom"
                      : showProfileMenu === false
                      ? "slide-top"
                      : "displayNone"
                  }
                >
                  Editar perfil
                </li>
              </Link>
              <li
                className={
                  showProfileMenu
                    ? "slide-bottom"
                    : showProfileMenu === false
                    ? "slide-top"
                    : "displayNone"
                }
              >
                Sair
              </li>
            </ul>
          </S.ProfileMenuList>
        </S.ProfileMenu>
      </S.ProfileContainer>
      <S.HomeContentContainer>
        <S.HomeContentSection1>
          <HomeDashboardBadges />
          <S.HomeLastPacientes>
            <h2>Ultimos Pacientes</h2>
            <S.HomeLastPacientesList>
              <PacienteAvatar
                image={"/assets/thais.webp"}
                name="Juliana Queiroz"
                index={1}
              />
              <PacienteAvatar
                image={"/assets/thais.webp"}
                name="Juliana Queiroz"
                index={2}
              />
              <PacienteAvatar
                image={"/assets/thais.webp"}
                name="Juliana Queiroz"
                index={3}
              />
              <PacienteAvatar
                image={"/assets/thais.webp"}
                name="Juliana Queiroz"
                index={4}
              />
              <PacienteAvatar
                image={"/assets/thais.webp"}
                name="Juliana Queiroz"
                index={5}
              />
              <PacienteAvatar
                image={"/assets/thais.webp"}
                name="Juliana Queiroz"
                index={6}
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
      </S.HomeContentContainer>
    </S.Container>
  );
}
