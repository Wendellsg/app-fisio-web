import { QueryClientProvider } from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import Head from "next/head";
import { useRouter } from "next/router";
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
import { queryClient } from "../src/functions/queryClient";
import { THEME } from "../src/theme";
import "../styles/globals.css";

setDefaultOptions({ locale: ptBR });

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider theme={THEME}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="bottom-right" />
        <Head>
          <title>App Fisio</title>
          <meta name="charset" content="utf-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <meta
            name="viewport"
            content="height=device-height, initial-scale=1.0"
          />

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
