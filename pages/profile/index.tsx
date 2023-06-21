import * as S from "../../src/types/routines/newRoutineStyles";
import { BsWhatsapp, BsEnvelope } from "react-icons/bs";
import { RiMapPinLine, RiEditBoxFill } from "react-icons/ri";
import useWindowDimensions from "../../src/functions/useWindowDimensions";
import Link from "next/link";
import { useUserData } from "../../src/hooks/useUserData";
import { Box } from "../../src/components/atoms/layouts";
import {
  HilightedText,
  Paragraph,
  Title,
} from "../../src/components/atoms/typograph";
import { Avatar } from "../../src/components/Avatar";
import { DefaultButton } from "../../src/components/molecules/Buttons";
import { useRouter } from "next/router";

export default function Profile() {
  const { width } = useWindowDimensions();
  const { userData } = useUserData();
  const router = useRouter();

  const iconsSize = width > 768 ? 53 : 30;

  return (
    <Box
      width="100%"
      justifyContent="space-between"
      gap="2rem"
      alignItems="flex-start"
      minHeight="80vh"
    >
      <Box width="50%" height="100%" flexDirection="column">
        <Box flexDirection="column" gap="1rem">
          <Title color="black" size="xxl">
            {userData?.name}
          </Title>
          <Box alignItems="center" gap="1rem" margin="2rem 0">
            <HilightedText size="large">{userData.profession}</HilightedText>
            <Paragraph fontWeight="bold">
              {userData.professionalLicense}
            </Paragraph>
          </Box>
          <Paragraph fontWeight="bold">{userData?.introduction}</Paragraph>
        </Box>

        <Box flexDirection="column" margin="auto 0 0 0" gap="1rem">
          <Box alignItems="center" gap="1rem">
            <S.ProfileContactIcon>
              <BsWhatsapp size={iconsSize} />
            </S.ProfileContactIcon>
            <Paragraph fontWeight="bold">{userData?.phone}</Paragraph>
          </Box>
          <Box alignItems="center" gap="1rem">
            <S.ProfileContactIcon>
              <BsEnvelope size={iconsSize} />
            </S.ProfileContactIcon>
            <Paragraph fontWeight="bold">{userData?.email}</Paragraph>
          </Box>

          <Box alignItems="center" gap="1rem">
            <S.ProfileContactIcon>
              <RiMapPinLine size={iconsSize} />
            </S.ProfileContactIcon>
            <Paragraph fontWeight="bold">
              {userData?.address}, {userData?.addressNumber} -{" "}
              {userData?.addressComplement}, {userData?.addressNeighborhood} -{" "}
              {userData?.addressCity} - {userData?.addressState}
            </Paragraph>
          </Box>
        </Box>
      </Box>
      <Box
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
      >
        <Avatar src={userData?.image} size="large" />
        <DefaultButton
          text="Editar Perfil"
          icon={<RiEditBoxFill />}
          onClick={() => router.push("/profile/editar")}
          type="submit"
        />
      </Box>
    </Box>
  );
}
