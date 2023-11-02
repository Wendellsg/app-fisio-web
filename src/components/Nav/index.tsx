import Link from "next/link";
import { useRouter } from "next/router";
import { Box } from "../atoms/layouts";
import styles from "./NavMenu.module.css";
import { NavContainer, SuporteButton } from "./styles";

export default function NavMenu() {
  const router = useRouter();

  return (
    <NavContainer>
      <div className={styles.logo}>
        <img src={"/assets/logo.png"} alt="logo" width={73} height={122} />
      </div>

      <ul>
        <Link href="/home" passHref>
          <li
            className={
              router.asPath === "/home" || router.asPath.match("/profile")
                ? styles.NavLinkActive
                : ""
            }
          >
            <img src={"/assets/home.png"} alt="Home" />
          </li>
        </Link>
        <Link href="/pacientes" passHref>
          <li
            className={
              router.asPath.match("/pacientes") ? styles.NavLinkActive : ""
            }
          >
            <img src={"/assets/pacientes.png"} alt="Pacientes" />
          </li>
        </Link>
        <Link href="/exercises" passHref>
          <li
            className={
              router.asPath.match("/exercises") ? styles.NavLinkActive : ""
            }
          >
            <img src={"/assets/exercicios.png"} alt="exercicios" />
          </li>
        </Link>
        <Link href="/feed">
          <li
            className={router.asPath.match("/feed") ? styles.NavLinkActive : ""}
          >
            <img src={"/assets/feed.png"} alt="feed" />
          </li>
        </Link>
      </ul>
      <SuporteButton>
        <Link href="/suporte">
          <Box
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              className={styles.suporteImage}
              src={"/assets/call.png"}
              alt="call"
              width={23}
              height={23}
            />
            <h4>Fale conosco</h4>
          </Box>
        </Link>
      </SuporteButton>
    </NavContainer>
  );
}
