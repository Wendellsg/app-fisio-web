import { useRouter } from "next/router";
import { Box } from "../atoms/layouts";
import { PatientAvatar, PatientAvatarImage } from "./styles";
import { Paragraph } from "../atoms/typograph";
export default function PacienteAvatar({ index, id, image, name }) {
  const router = useRouter();

  return (
    <Box>
      <Box
        className="scale-in-center"
        style={{ animationDelay: `${index}0ms` }}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
        maxWidth="100px"
      >
        <PatientAvatar
          className={`ScalableButton`}
          onClick={() => router.push(`/pacientes/${id}`)}
        >
          <PatientAvatarImage alt="imagem de perfil" width={76} src={image} />
        </PatientAvatar>
        <Paragraph
          fontWeight="bold"
          align="center"
          style={{
            lineHeight: "1.2rem",
          }}
        >
          {name}
        </Paragraph>
      </Box>
    </Box>
  );
}
