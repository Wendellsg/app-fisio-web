import "../styles/globals.css";
import NavMenu from "../src/components/Nav";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../src/hooks/useAuth";
import { useExercises } from "../src/hooks";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const { userToken } = useAuth();
  const { getExercises } = useExercises();

  useEffect(() => {
    if (userToken) {
      getExercises();
    }
  }, [userToken]);

  return (
    <div className="App-container">
      <ToastContainer />
      <Head>
        <title>App Fisio</title>
        <meta
          name="description"
          content="App Físio de fisioterapeuta para fisioterapeuta"
        />
        <link rel="icon" href="/assets/exercicios.png" />
      </Head>
      <NavMenu />
      <div className="Page-container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
