import { useRouter } from "next/router";
import { Box } from "../../src/components/atoms/layouts";
import { Paragraph } from "../../src/components/atoms/typograph";
import { DefaultButton } from "../../src/components/molecules/Buttons";
import { Input } from "../../src/components/molecules/forms";
import { AlreadyLoggedCard } from "../../src/components/organisms/AlreadyLoggedCard";
import { useAuth } from "../../src/hooks/useAuth";

const Login = () => {
  const { token, login, register, handleSubmit, loginErrors, isLogging } =
    useAuth();
  const router = useRouter();
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
      {token && <AlreadyLoggedCard />}

      {!token && (
        <form onSubmit={handleSubmit(login)}>
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
              type="email"
              label="E-mail"
              name="email"
              error={loginErrors?.email?.message}
              register={register}
            />
            <Input
              placeholder="Senha"
              type="password"
              label="Senha"
              name="password"
              error={loginErrors?.password?.message}
              register={register}
              onEnterPress={handleSubmit(login)}
            />

            <DefaultButton
              text="Entrar"
              type="submit"
              width="100%"
              onClick={handleSubmit(login)}
              onSubmit={handleSubmit(login)}
              isLoading={isLogging}
              disabled={isLogging || Object.keys(loginErrors).length > 0}
              loadingText="Entrando..."
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
        </form>
      )}
    </Box>
  );
};

export default Login;
