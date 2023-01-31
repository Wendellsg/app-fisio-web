import { Avatar } from "../../../src/components/Avatar";
import { DefaultButton } from "../../../src/components/molecules/Buttons";
import { useWindowsDimensions } from "../../../src/hooks";
import { BRPhoneMask, BRZipCodeMask, CPFMask } from "../../../src/utils/maskes";
import { FaSave } from "react-icons/fa";
import { Label, Input } from "../../../src/components/atoms/forms";
import {
  CenteredColumn,
  CenteredRow,
} from "../../../src/components/atoms/layouts";
import { useState } from "react";
import { Patient } from "../../types";
interface PatientFormProps {
  edit?: boolean;
  patienteData?: Patient;
}

const initialPatientState = {
  name: "",
  email: "",
  birthDate: new Date().toISOString().split("T")[0],
  height: 1.8,
  weight: 80,
  document: "",
  phone: "",
  zipCode: "",
  address: "",
  adressNumber: "",
  adressComplement: "",
  city: "",
  state: "",
  profilePicture:
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
};

export const PatientForm: React.FC<PatientFormProps> = ({
  edit,
  patienteData,
}) => {
  const [patient, setPatient] = useState<Partial<Patient>>(
    patienteData || initialPatientState
  );
  const { width } = useWindowsDimensions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target?.files?.[0];
    if (!file) return;
    const url = URL?.createObjectURL(file);
    setPatient((prev) => ({ ...prev, profilePicture: url }));
  };

  const handleSave = () => {
    console.log(patient);
  };
  return (
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
              placeholder="Nome do paciente"
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
              placeholder="E-mail do paciente"
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
              placeholder="1,80"
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
              placeholder="80"
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
              placeholder="(01) 92345-6789"
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
              type={"text"}
              placeholder="000.000.000-00"
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
              placeholder="Rua maria da silva"
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
              placeholder="01"
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
              placeholder="Apto 01"
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
              placeholder="00000-000"
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
              placeholder="São Paulo"
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
              placeholder="SP"
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
          changeAvatar={handleFileUpload}
        />

        <DefaultButton
          text={edit ? "Salvar alterações" : "Cadastrar paciente"}
          type="confirmation"
          icon={<FaSave color="#000" size={25} />}
          onClick={handleSave}
        />
      </CenteredColumn>
    </CenteredRow>
  );
};
