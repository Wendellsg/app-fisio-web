import {
  CenteredColumn,
  CenteredRow,
  PageContainer,
} from "../../../src/components/atoms/layouts";
import { HilightedText } from "../../../src/components/atoms/typograph";
import { useRouter } from "next/router";
import { mockedPatient } from "../../../src/mock/Paciente";
import { Label, Input } from "../../../src/components/atoms/forms";
import { Patient } from "../../../src/types";
import { IoCloudUpload } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import { Avatar } from "../../../src/components/Avatar";
import { DefaultButton } from "../../../src/components/molecules/Buttons";
import { useWindowsDimensions } from "../../../src/hooks";

const EditPatient = () => {
  const router = useRouter();
  const [patient, setPatient] = useState<Partial<Patient>>(mockedPatient);
  const { id } = router.query;
  const { width } = useWindowsDimensions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handkeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target?.files?.[0];
    if (!file) return;
    const url = URL?.createObjectURL(file);
    setPatient((prev) => ({ ...prev, profilePicture: url }));
  };

  const handleUploadClick = () => {
    const input = document.getElementById("imgupload");
    input?.click();
  };

  return (
    <PageContainer>
      <HilightedText size="large">Editar Paciente</HilightedText>
      <CenteredRow
        gap="1rem"
        justifyContent="flex-start"
        alignItems="flex-start"
        wrap="wrap"
        style={{ flexDirection: width > 559 ? "row" : "column-reverse" }}
      >
        <CenteredColumn height="fit-content">
          <CenteredRow height="fit-content" gap="1rem" wrap="wrap">
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Nome</Label>
              <Input
                value={patient.name}
                name="name"
                onChange={handleInputChange}
                minWidth="15rem"
              />
            </CenteredColumn>
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>E-mail</Label>
              <Input
                value={patient.email}
                name="email"
                onChange={handleInputChange}
                minWidth="15rem"
              />
            </CenteredColumn>
          </CenteredRow>
        </CenteredColumn>
        <CenteredColumn height="fit-content" gap="1rem">
          <Avatar
            src={patient.profilePicture}
            alt={patient.name}
            size="large"
          />
          <DefaultButton
            text="Enviar imagem"
            type="neutral"
            onClick={handleUploadClick}
            icon={<IoCloudUpload color="#000" size={25} />}
          />
          <input
            type="file"
            id="imgupload"
            style={{ display: "none" }}
            onChange={handkeFileUpload}
          />
          <DefaultButton
            text="Salvar alterações"
            type="confirmation"
            icon={<FaSave color="#000" size={25} />}
          />
        </CenteredColumn>
      </CenteredRow>
    </PageContainer>
  );
};

export default EditPatient;
