import * as S from "../../src/types/routines/newRoutineStyles";
import { BsWhatsapp, BsEnvelope } from "react-icons/bs";
import { RiMapPinLine, RiEditBoxFill } from "react-icons/ri";
import useWindowDimensions from "../../src/functions/useWindowDimensions";
import Link from "next/link";
import { useUserData } from "../../src/hooks/useUserData";
import { Box } from "../../src/components/atoms/layouts";

export default function Profile() {
  const { width } = useWindowDimensions();
  const { userData } = useUserData();

  const iconsSize = width > 768 ? 53 : 30;

  return (
    <Box width="100%" justifyContent="space-between" gap="2rem">
      <S.ProfileFirstColumn>
        <div>
          <S.ProfileName>Dra. {userData?.name}</S.ProfileName>
          <S.FisioInfo>
            <h2>Fisioterapeuta</h2>
            <h3> Crefito: 340602-F</h3>
          </S.FisioInfo>
          <S.ProfileResume>{userData?.introduction}</S.ProfileResume>
        </div>

        <div>
          <S.ProfileContact>
            <S.ProfileContactIcon>
              <BsWhatsapp size={iconsSize} />
            </S.ProfileContactIcon>
            <span>{userData?.phone}</span>
          </S.ProfileContact>
          <S.ProfileContact>
            <S.ProfileContactIcon>
              <BsEnvelope size={iconsSize} />
            </S.ProfileContactIcon>
            <span>{userData?.email}</span>
          </S.ProfileContact>

          <S.ProfileContact>
            <S.ProfileContactIcon>
              <RiMapPinLine size={iconsSize} />
            </S.ProfileContactIcon>
            <span>
              Av. Ver. José Monteiro, 1655 - Setor Negrão de Lima, Goiânia - GO,
              74653-230
            </span>
          </S.ProfileContact>
        </div>
      </S.ProfileFirstColumn>
      <S.ProfileSecundColumn>
        <S.ProfileImageBorder>
          <img src={userData?.image} alt="Profile Image" />
        </S.ProfileImageBorder>
        <Link href={"/profile/editar"}>
          <S.EditPerfilButton>
            <p>Editar perfil</p>
            <S.EditPerfilButtonIcon>
              <RiEditBoxFill color={"#000"} size={30} />
            </S.EditPerfilButtonIcon>
          </S.EditPerfilButton>
        </Link>
      </S.ProfileSecundColumn>
    </Box>
  );
}
