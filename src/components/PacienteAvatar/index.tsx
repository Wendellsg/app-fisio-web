import { useRouter } from "next/router";
import { Box } from "../atoms/layouts";
import { PatientAvatar, PatientAvatarImage } from "./styles";
import { Paragraph } from "../atoms/typograph";
export default function PacienteAvatar({
  index = 0,
  id,
  image,
  name,
  onClick,
  direction = "column",
}: {
  index?: number;
  id: string;
  image?: string;
  name: string;
  onClick?: () => void;
  direction?: "row" | "column";
}) {
  const router = useRouter();

  return (
    <Box width="fit-content" minWidth="90px">
      <Box
        className="scale-in-center"
        style={{ animationDelay: `${index}0ms` }}
        flexDirection={direction}
        alignItems="center"
        justifyContent="center"
        gap="1rem"
        maxWidth="fit-content"
      >
        <PatientAvatar className={`ScalableButton`} onClick={onClick}>
          <PatientAvatarImage
            alt="imagem de perfil"
            width={76}
            src={
              image
                ? image
                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }
          />
        </PatientAvatar>
        <Paragraph
          fontWeight="bold"
          align="center"
          style={{
            lineHeight: "1.2rem",
          }}
        >
          {name.length > 15 ? `${name.slice(0, 15)}...` : name}
        </Paragraph>
      </Box>
    </Box>
  );
}
