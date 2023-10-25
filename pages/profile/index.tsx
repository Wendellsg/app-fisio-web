import { useRouter } from "next/router";
import { BsEnvelope, BsWhatsapp } from "react-icons/bs";
import { RiEditBoxFill, RiMapPinLine } from "react-icons/ri";
import { Avatar } from "../../src/components/Avatar";
import { Box } from "../../src/components/atoms/layouts";
import {
  HilightedText,
  Paragraph,
  Title,
} from "../../src/components/atoms/typograph";
import { DefaultButton } from "../../src/components/molecules/Buttons";
import useWindowDimensions from "../../src/functions/useWindowDimensions";
import { useUserData } from "../../src/hooks/useUserData";

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
      padding="2rem"
    >
      <Box width="50%" height="100%" flexDirection="column">
        <Box flexDirection="column" gap="1rem">
          <Title color="black" size={width > 768 ? "xxl" : "xl"}>
            {userData?.name}
          </Title>
          <Box alignItems="center" gap="1rem" margin="2rem 0" flexWrap="wrap">
            <HilightedText size="large">{userData?.profession}</HilightedText>
            <Paragraph fontWeight="bold">
              {userData?.professionalLicense}
            </Paragraph>
          </Box>
          <Paragraph fontWeight="bold">{userData?.introduction}</Paragraph>
        </Box>

        <Box flexDirection="column" margin="auto 0 0 0" gap="1rem">
          <Box alignItems="center" gap="1rem">
            <BsWhatsapp size={iconsSize} />

            <Paragraph fontWeight="bold">{userData?.phone}</Paragraph>
          </Box>
          <Box alignItems="center" gap="1rem">
            <BsEnvelope size={iconsSize} />

            <Paragraph fontWeight="bold">{userData?.email}</Paragraph>
          </Box>

          <Box alignItems="center" gap="1rem">
            <Box width="60px">
              <RiMapPinLine size={iconsSize} />
            </Box>

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
        <Avatar src={userData?.image} size={width > 768 ? "large" : "medium"} />
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
