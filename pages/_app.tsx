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

function MyApp({ Component, pageProps }) {
  const { isAuthenticated, getUserdata, setIsAuthenticated } = useAuth();
  const { getExercises } = useExercises();
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("fisio@token");
    if (!savedToken && !checkIsPublicRoute(router.pathname)) {
      router.push("/");
    }

    if (savedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getUserdata();
      getExercises();
    }
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={THEME}>
      <ToastContainer />
      <Head>
        <title>App Fisio</title>
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
