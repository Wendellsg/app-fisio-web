import Link from "next/link";
import { useRouter } from "next/router";
import { Box } from "../atoms/layouts";
import { LogoContainer, NavContainer, NavItem, SuporteButton } from "./styles";

export default function NavMenu() {
  const router = useRouter();

  return (
    <NavContainer>
      <LogoContainer>
        <img src={"/assets/logo.png"} alt="logo" width={73} height={122} />
      </LogoContainer>

      <ul>
        <Link href="/home" passHref>
          <NavItem
            active={
              router.asPath === "/home" || !!router.asPath.match("/profile")
            }
          >
            <img src={"/assets/home.png"} alt="Home" />
          </NavItem>
        </Link>
        <Link href="/pacientes" passHref>
          <NavItem active={!!router.asPath.match("/pacientes")}>
            <img src={"/assets/pacientes.png"} alt="Pacientes" />
          </NavItem>
        </Link>
        <Link href="/exercises" passHref>
          <NavItem active={!!router.asPath.match("/exercises")}>
            <img src={"/assets/exercicios.png"} alt="exercicios" />
          </NavItem>
        </Link>
        <Link href="/feed">
          <NavItem active={!!router.asPath.match("/feed")}>
            <img src={"/assets/feed.png"} alt="feed" />
          </NavItem>
        </Link>
      </ul>
      <SuporteButton>
        <Link href="/suporte">
          <Box
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img src={"/assets/call.png"} alt="call" width={23} height={23} />
            <h4>Fale conosco</h4>
          </Box>
        </Link>
      </SuporteButton>
    </NavContainer>
  );
}
