import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useAuth";
import { useUserData } from "../../../hooks/useUserData";
import { Avatar } from "../../Avatar";
import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";
import { DefaultButton } from "../../molecules/Buttons";

export const AlreadyLoggedCard = () => {
  const { logout } = useAuth();
  const { userData } = useUserData();
  const router = useRouter();
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="white"
      padding="2rem"
      borderRadius="1rem"
    >
      <Avatar src={userData?.image} size="medium" />
      <Paragraph
        color="black"
        fontWeight="regular"
        style={{
          marginTop: "1rem",
        }}
      >
        Você está logado(a) como
      </Paragraph>
      <Paragraph color="black" fontWeight="bold" size="lg">
        {userData?.name}
      </Paragraph>

      <Box margin="2rem 0" gap="1rem">
        <DefaultButton
          text="Sair"
          type="disabled"
          width="150px"
          onClick={logout}
        />
        <DefaultButton
          text="Continuar"
          type="submit"
          width="150px"
          onClick={() => router.push("/home")}
        />
      </Box>
    </Box>
  );
};
