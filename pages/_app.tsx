import "../styles/globals.css";
import NavMenu from "../src/components/Nav";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../src/hooks/useAuth";
import { useExercises } from "../src/hooks";
import { useEffect } from "react";
import { AppContainer, PageContent } from "../src/components/atoms/layouts";
import { useRouter } from "next/router";
import { checkIsPublicRoute } from "../src/constants/app-router";
import { ThemeProvider } from "styled-components";
import { THEME } from "../src/theme";
import { useUserData } from "../src/hooks/useUserData";
import { useApi } from "../src/hooks/Apis";
import { usePatients } from "../src/hooks/usePatients";

function MyApp({ Component, pageProps }) {
  const { getUserdata, setUserData, userData } = useUserData();
  const { getPatients } = usePatients();
  const { getExercises } = useExercises();
  const { token, setToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("fisio@token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserdata();
      getExercises();
    }

    return () => {
      setUserData(null);
    };
  }, [token]);

  useEffect(() => {
    if (userData && userData._id) {
      getPatients();
    }
  }, [userData?._id]);

  return (
    <ThemeProvider theme={THEME}>
      <ToastContainer position="bottom-right" />
      <Head>
        <title>App Fisio</title>
        <meta name="charset" content="utf-8" />
        <meta lang="pt-br" />
        <meta
          name="description"
          content="App Físio de fisioterapeuta para fisioterapeuta"
        />
        <link rel="icon" href="/assets/exercicios.png" />
      </Head>

      {!checkIsPublicRoute(router.pathname) ? (
        <>
          <AppContainer>
            <NavMenu />
            <PageContent>
              <Component {...pageProps} />
            </PageContent>
          </AppContainer>
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}

export default MyApp;
