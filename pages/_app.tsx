import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import NavMenu from "../src/components/Nav";
import {
  AppContainer,
  Box,
  PageContent,
} from "../src/components/atoms/layouts";
import { checkIsPublicRoute } from "../src/constants/app-router";
import { useExercises } from "../src/hooks";
import { useAuth } from "../src/hooks/useAuth";
import { usePatients } from "../src/hooks/usePatients";
import { useUserData } from "../src/hooks/useUserData";
import { THEME } from "../src/theme";
import "../styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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
      <QueryClientProvider client={queryClient}>
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
          <>
            <Box minWidth="100vw" minHeight="100vh">
              <Component {...pageProps} />
            </Box>
          </>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
