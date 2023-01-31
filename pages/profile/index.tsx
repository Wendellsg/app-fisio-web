import * as S from "./styles";
import { BsWhatsapp, BsEnvelope } from "react-icons/bs";
import { RiMapPinLine, RiEditBoxFill } from "react-icons/ri";
import useWindowDimensions from "../../src/functions/useWindowDimensions";
import Link from "next/link";

export default function Profile() {
  const { width } = useWindowDimensions();

  const iconsSize = width > 768 ? 53 : 30;

  return (
    <S.ProfileContainer>
      <S.ProfileFirstColumn>
        <div>
          <S.ProfileName>Dra. Thais Passos</S.ProfileName>
          <S.FisioInfo>
            <h2>Fisioterapeuta</h2>
            <h3> Crefito: 340602-F</h3>
          </S.FisioInfo>
          <S.ProfileResume>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </S.ProfileResume>
        </div>

        <div>
          <S.ProfileContact>
            <S.ProfileContactIcon>
              <BsWhatsapp size={iconsSize} />
            </S.ProfileContactIcon>
            <span>13 98252-8674</span>
          </S.ProfileContact>
          <S.ProfileContact>
            <S.ProfileContactIcon>
              <BsEnvelope size={iconsSize} />
            </S.ProfileContactIcon>
            <span>thais.passosolive@gmail.com</span>
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
          <img src="/assets/thais.webp" alt="Profile Image" />
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
    </S.ProfileContainer>
  );
}
