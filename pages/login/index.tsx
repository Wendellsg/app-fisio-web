import { useRouter } from "next/router";
import { Box } from "../../src/components/atoms/layouts";
import { useAuth } from "../../src/hooks/useAuth";
import { ProfileImage } from "../../styles/Home.styles";
import { Avatar } from "../../src/components/Avatar";
import { Paragraph } from "../../src/components/atoms/typograph";
import { DefaultButton } from "../../src/components/molecules/Buttons";
import { AlreadyLoggedCard } from "../../src/components/organisms/AlreadyLoggedCard";
import { Input } from "../../src/components/atoms/forms";
import { useState } from "react";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Box
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      style={{
        backgroundColor: "#FFF",
      }}
    >
      {isAuthenticated && <AlreadyLoggedCard />}

      {!isAuthenticated && (
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
          style={{
            borderRadius: "1rem",
            backgroundColor: "#FFF",
            padding: "2rem",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Paragraph fontWeight="bold">Faça login</Paragraph>
          <Input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <DefaultButton
            text="Entrar"
            type="confirmation"
            width="100%"
            onClick={() => login(email, password)}
          />

          <Box
            width="100%"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{
              borderTop: "1px solid #DDD",
              paddingTop: "1rem",
            }}
          >
            <Paragraph fontWeight="regular" size="xs">
              Não tem uma conta?
            </Paragraph>
            <Paragraph
              color="black"
              fontWeight="bold"
              size="md"
              style={{
                cursor: "pointer",
              }}
              onClick={() => router.push("/register")}
            >
              Cadastre-se
            </Paragraph>

            <Paragraph color="black" fontWeight="regular" size="xs">
              Esqueceu sua senha?
            </Paragraph>
            <Paragraph
              color="black"
              fontWeight="bold"
              size="md"
              style={{
                cursor: "pointer",
              }}
              onClick={() => router.push("/forgot-password")}
            >
              Recuperar senha
            </Paragraph>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Login;
