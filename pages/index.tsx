import { useRouter } from "next/router";
import { Box } from "../src/components/atoms/layouts";
import { Paragraph } from "../src/components/atoms/typograph";
import { DefaultButton } from "../src/components/molecules/Buttons";
import { AlreadyLoggedCard } from "../src/components/organisms/AlreadyLoggedCard";
import { useUserData } from "../src/hooks/useUserData";
export default function LandingPage() {
  const { userData } = useUserData();
  const router = useRouter();

  return (
    <Box
      width="100%"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding="2rem 0"
      style={{
        backgroundImage:
          "url('https://fisio-app.s3.sa-east-1.amazonaws.com/images/pexels-ryutaro-tsukata-5473186.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {
        <Box
          width="400px"
          borderRadius="10px"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
          maxWidth="90%"
          style={{
            borderRadius: "1rem",
            backgroundColor: "#FFF",
            padding: "2rem",
            boxShadow: "0px 0px 10px rgba(53, 34, 34, 0.1)",
          }}
        >
          {userData?._id ? (
            <AlreadyLoggedCard />
          ) : (
            <>
              <img src={"/assets/exercicios.png"} alt="exercicios" />
              <Paragraph
                fontWeight="regular"
                size="lg"
                style={{ textAlign: "center" }}
              >
                Bem-vindo ao <b>Fsio.app</b>!
              </Paragraph>

              <Paragraph
                fontWeight="regular"
                size="lg"
                style={{ textAlign: "center" }}
              >
                Para começar, faça login
              </Paragraph>

              <DefaultButton
                text="Fazer login"
                width="100%"
                type="submit"
                onClick={() => router.push("/login")}
              />
            </>
          )}
        </Box>
      }
    </Box>
  );
}
