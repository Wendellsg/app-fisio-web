import { Avatar } from "../../../src/components/Avatar";
import { DefaultButton } from "../../../src/components/molecules/Buttons";
import { useWindowsDimensions } from "../../../src/hooks";
import { BRPhoneMask, BRZipCodeMask, CPFMask } from "../../../src/utils/maskes";
import { FaSave } from "react-icons/fa";
import { Box } from "../../../src/components/atoms/layouts";
import { useState } from "react";
import { Patient } from "../../types";
import { Input } from "../molecules/forms";
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
    <Box
      gap="1rem"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexWrap="wrap"
      style={{ flexDirection: width > 559 ? "row" : "column-reverse" }}
      flexDirection="column-reverse"
    >
      <Box
        gap="2rem"
        justifyContent="flex-start"
        style={{
          maxHeight: width > 559 ? "70vh" : "fit-content",
          overflowY: width > 559 ? "auto" : "hidden",
          paddingRight: "1rem",
          paddingTop: "1rem",
          paddingBottom: width < 559 ? "60px" : "0",
        }}
        flexDirection="column"
      >
        <Box height="fit-content" gap="1rem" flexWrap="wrap">
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              label="Nome do paciente"
              value={patient.name}
              name="name"
              type="text"
              onChange={handleInputChange}
              minWidth="15rem"
              placeholder="Nome do paciente"
            />
          </Box>
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              value={patient.email}
              name="email"
              label="E-mail do paciente"
              onChange={handleInputChange}
              minWidth="15rem"
              type={"email"}
              placeholder="E-mail do paciente"
            />
          </Box>
        </Box>
        <Box height="fit-content" gap="1rem" flexWrap="wrap">
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              value={patient.birthDate}
              name="birthDate"
              onChange={handleInputChange}
              minWidth="10rem"
              type={"date"}
              placeholder="Data de nascimento"
              label="Data de nascimento"
            />
          </Box>
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              value={patient.height}
              label="Altura"
              name="height"
              onChange={handleInputChange}
              minWidth="10rem"
              type={"number"}
              placeholder="1,80"
            />
          </Box>
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              value={patient.weight}
              label="Peso"
              name="weight"
              onChange={handleInputChange}
              minWidth="10rem"
              type={"number"}
              placeholder="80"
            />
          </Box>
        </Box>
        <Box height="fit-content" gap="1rem" flexWrap="wrap">
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              value={BRPhoneMask(patient.phone)}
              name="phone"
              label="Telefone"
              onChange={handleInputChange}
              minWidth="10rem"
              type={"tel"}
              placeholder="(01) 92345-6789"
            />
          </Box>
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              value={CPFMask(patient.document)}
              name="document"
              label="CPF"
              onChange={handleInputChange}
              minWidth="10rem"
              type={"text"}
              placeholder="000.000.000-00"
            />
          </Box>
        </Box>
        <Box height="fit-content" gap="1rem" flexWrap="wrap">
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              value={patient.address}
              name="address"
              label="Endereço"
              onChange={handleInputChange}
              minWidth="15rem"
              type="address"
              placeholder="Rua maria da silva"
            />
          </Box>
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              value={patient.adressNumber}
              name="adressNumber"
              label="Número"
              type="number"
              onChange={handleInputChange}
              minWidth="5rem"
              placeholder="01"
            />
          </Box>
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              value={patient.adressComplement}
              name="adressComplement"
              label="Complemento"
              type="text"
              onChange={handleInputChange}
              minWidth="5rem"
              placeholder="Apto 01"
            />
          </Box>
        </Box>
        <Box height="fit-content" gap="1rem" flexWrap="wrap">
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              value={BRZipCodeMask(patient.zipCode)}
              name="zipCode"
              label="CEP"
              type="text"
              onChange={handleInputChange}
              minWidth="5rem"
              placeholder="00000-000"
            />
          </Box>
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              value={patient.city}
              name="city"
              label="Cidade"
              type="text"
              onChange={handleInputChange}
              minWidth="10rem"
              placeholder="São Paulo"
            />
          </Box>
          <Box
            justifyContent="flex-start"
            height="fit-content"
            alignItems="flex-start"
          >
            <Input
              value={patient.state}
              name="state"
              label="Estado"
              type="text"
              onChange={handleInputChange}
              minWidth="5rem"
              placeholder="SP"
            />
          </Box>
        </Box>
      </Box>
      <Box
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
          type="submit"
          icon={<FaSave color="#000" size={25} />}
          onClick={handleSave}
        />
      </Box>
    </Box>
  );
};
