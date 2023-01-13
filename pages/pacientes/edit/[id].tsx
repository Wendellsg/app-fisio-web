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
import { BRPhoneMask, BRZipCodeMask, CPFMask } from "../../../src/utils/maskes";

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

  const handleSave = () => {
    console.log(patient);
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
        <CenteredColumn
          gap="2rem"
          justifyContent="flex-start"
          style={{
            maxHeight: width > 559 ? "70vh" : "fit-content",
            overflowY: width > 559 ? "auto" : "hidden",
            paddingRight: "1rem",
            paddingTop: "1rem",
            paddingBottom: width < 559 ? "60px" : "0",
          }}
        >
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
                type={"email"}
              />
            </CenteredColumn>
          </CenteredRow>
          <CenteredRow height="fit-content" gap="1rem" wrap="wrap">
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Data de nacimento</Label>
              <Input
                value={patient.birthDate}
                name="birthDate"
                onChange={handleInputChange}
                minWidth="10rem"
                type={"date"}
              />
            </CenteredColumn>
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Altura</Label>
              <Input
                value={patient.height}
                name="height"
                onChange={handleInputChange}
                minWidth="10rem"
                type={"number"}
              />
            </CenteredColumn>
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Peso</Label>
              <Input
                value={patient.weight}
                name="weight"
                onChange={handleInputChange}
                minWidth="10rem"
                type={"number"}
              />
            </CenteredColumn>
          </CenteredRow>
          <CenteredRow height="fit-content" gap="1rem" wrap="wrap">
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Telefone</Label>
              <Input
                value={BRPhoneMask(patient.phone)}
                name="phone"
                onChange={handleInputChange}
                minWidth="10rem"
                type={"tel"}
              />
            </CenteredColumn>
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>CPF</Label>
              <Input
                value={CPFMask(patient.document)}
                name="document"
                onChange={handleInputChange}
                minWidth="10rem"
              />
            </CenteredColumn>
          </CenteredRow>
          <CenteredRow height="fit-content" gap="1rem" wrap="wrap">
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Endereço</Label>
              <Input
                value={patient.address}
                name="address"
                onChange={handleInputChange}
                minWidth="15rem"
                type="address"
              />
            </CenteredColumn>
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Número</Label>
              <Input
                value={patient.adressNumber}
                name="adressNumber"
                onChange={handleInputChange}
                minWidth="5rem"
              />
            </CenteredColumn>
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Complemento</Label>
              <Input
                value={patient.adressComplement}
                name="adressComplement"
                onChange={handleInputChange}
                minWidth="5rem"
              />
            </CenteredColumn>
          </CenteredRow>
          <CenteredRow height="fit-content" gap="1rem" wrap="wrap">
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>CEP</Label>
              <Input
                value={BRZipCodeMask(patient.zipCode)}
                name="zipCode"
                onChange={handleInputChange}
                minWidth="5rem"
              />
            </CenteredColumn>
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Cidade</Label>
              <Input
                value={patient.city}
                name="city"
                onChange={handleInputChange}
                minWidth="10rem"
              />
            </CenteredColumn>
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Estado</Label>
              <Input
                value={patient.state}
                name="state"
                onChange={handleInputChange}
                minWidth="5rem"
              />
            </CenteredColumn>
          </CenteredRow>
        </CenteredColumn>
        <CenteredColumn
          gap="1rem"
          justifyContent="flex-start"
          style={{
            maxHeight: width < 768 ? "200px" : "fit-content",
          }}
        >
          <Avatar
            src={patient.profilePicture}
            alt={patient.name}
            size={width < 768 ? "medium" : "large"}
          />
          <DefaultButton
            text="Trocar imagem"
            type="neutral"
            onClick={handleUploadClick}
            icon={<IoCloudUpload color="#000" size={20} />}
          />
          <input
            type="file"
            id="imgupload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handkeFileUpload}
          />
          <DefaultButton
            text="Salvar alterações"
            type="confirmation"
            icon={<FaSave color="#000" size={25} />}
            onClick={handleSave}
          />
        </CenteredColumn>
      </CenteredRow>
    </PageContainer>
  );
};

export default EditPatient;
