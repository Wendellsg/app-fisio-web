import { useEffect, useState } from "react";
import { RiSave2Fill } from "react-icons/ri";
import LoadingIcon from "../../../src/components/LoadingIcon";
import { Box } from "../../../src/components/atoms/layouts";
import { Title } from "../../../src/components/atoms/typograph";
import { Select } from "../../../src/components/molecules/Select";
import {
  Input,
  TextArea,
  Toggle,
} from "../../../src/components/molecules/forms";
import { useUploader } from "../../../src/hooks/useUploader/useUploader";
import { useUserData } from "../../../src/hooks/useUserData";
import { UserUpdateData, userDataSchema } from "../../../src/types/user";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Avatar } from "../../../src/components/Avatar";
import { DefaultButton } from "../../../src/components/molecules/Buttons";
import { useWindowsDimensions } from "../../../src/hooks";

export default function EditProfilePage() {
  const { upload } = useUploader();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  const { userData, updateUserProfileImage, updateUserProfileData } =
    useUserData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserUpdateData>({
    resolver: zodResolver(userDataSchema),
    defaultValues: userData || {},
  });

  const { width } = useWindowsDimensions();

  const [imageUrl, setImageUrl] = useState<string | null>(userData?.image);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target?.files?.[0];
    setImageFile(file);
    if (!file) return;
    const url = URL?.createObjectURL(file);
    setImageUrl(url);
  };

  useEffect(() => {
    if (userData?.image) setImageUrl(userData?.image);
  }, [userData?.image]);
  if (!userData?.name) return <LoadingIcon />;

  return (
    <EditProfileContainer
      width="100%"
      justifyContent="space-between"
      gap="2rem"
      overflow="auto"
      padding="2rem"
    >
      <form onSubmit={handleSubmit(updateUserProfileData)}>
        <Box flexDirection="column" width="100%" gap="1rem">
          <Title color="black">Dados pessoais</Title>

          <Box width="100%" gap="1rem" flexWrap="wrap">
            <Input
              name="name"
              label="Seu nome"
              minWidth="auto"
              type={"text"}
              placeholder="Digite seu nome"
              register={register}
              error={errors?.name?.message}
            />
            <Input
              name="email"
              label="E-mail"
              minWidth="15rem"
              type={"text"}
              placeholder="Digite seu e-mail"
              register={register}
              error={errors?.email?.message}
              disabled
            />
          </Box>
          <Box width="100%" gap="1rem" flexWrap="wrap">
            <Input
              name="birthDate"
              label="Data de nascimento"
              minWidth="16.2rem"
              type={"date"}
              placeholder="Sua data de nascimento"
              register={register}
              error={errors?.birthDate?.message}
            />
            <Input
              name="phone"
              label="Telefone"
              minWidth="15rem"
              type={"text"}
              placeholder="Seu telefone"
              register={register}
              error={errors?.phone?.message}
            />
          </Box>

          <Box width="100%" gap="1rem" flexWrap="wrap">
            <Input
              name="zipCode"
              label="CEP"
              minWidth="15rem"
              type={"text"}
              placeholder="Seu CEP"
              register={register}
              error={errors?.zipCode?.message}
            />
            <Input
              name="address"
              label="Rua"
              minWidth="15rem"
              type={"text"}
              placeholder="Sua rua"
              register={register}
              error={errors?.address?.message}
            />
          </Box>

          <Box width="100%" gap="1rem" flexWrap="wrap">
            <Input
              name="addressNumber"
              label="Número"
              minWidth="15rem"
              type={"text"}
              placeholder="Número da sua casa"
              register={register}
              error={errors?.addressNumber?.message}
            />
            <Input
              name="addressComplement"
              label="Complemento"
              minWidth="15rem"
              type={"text"}
              placeholder="Apto, bloco, etc."
              register={register}
              error={errors?.addressComplement?.message}
            />
          </Box>

          <Box width="100%" gap="1rem" flexWrap="wrap">
            <Input
              name="addressNeighborhood"
              label="Bairro"
              minWidth="15rem"
              type={"text"}
              placeholder="Seu bairro"
              register={register}
              error={errors?.addressNeighborhood?.message}
            />
            <Input
              name="addressCity"
              label="Cidade"
              minWidth="15rem"
              type={"text"}
              placeholder="Sua cidade"
              register={register}
              error={errors?.addressCity?.message}
            />
          </Box>

          <Box width="100%" gap="1rem" flexWrap="wrap">
            <Input
              name="addressState"
              label="Estado"
              minWidth="15rem"
              type={"text"}
              placeholder="Seu estado"
              register={register}
              error={errors?.addressState?.message}
            />

            <Input
              name="addressCountry"
              label="País"
              minWidth="15rem"
              type={"text"}
              placeholder="Seu país"
              register={register}
              error={errors?.addressCountry?.message}
            />
          </Box>

          <Box width="100%" gap="1rem">
            <Toggle
              name="isProfessional"
              label="Você é profissional da saúde?"
              register={register}
              errorMessage={errors?.isProfessional?.message}
              value={watch("isProfessional")}
            />
          </Box>

          {watch("isProfessional") && (
            <>
              <Title color="black" style={{ marginTop: "2rem" }}>
                Dados Profissionais
              </Title>

              <Box width="100%" gap="1rem" flexWrap="wrap">
                <Select
                  label="Profissão"
                  width="15rem"
                  minWidth="fit-content"
                  value={
                    watch("profession") && {
                      value: watch("profession"),
                      label: watch("profession"),
                    }
                  }
                  options={[
                    { value: "Fisioterapeura", label: "Fisioterapeura" },
                    {
                      value: "Teraupeuta Ocupacional",
                      label: "Teraupeuta Ocupacional",
                    },
                    { value: "Educador Físico", label: "Educador Físico" },
                  ]}
                  onChange={(value) => {
                    setValue("profession", value?.value);
                  }}
                  error={errors?.profession?.message}
                />

                <Input
                  name="professionalLicense"
                  label="Carteira profissional"
                  minWidth="15rem"
                  type={"text"}
                  placeholder="Crefito ou Cref"
                  register={register}
                  error={errors?.addressState?.message}
                />
              </Box>

              <Box>
                <Input
                  name="professionalLicenseState"
                  label="Estado da carteira profissional"
                  minWidth="15rem"
                  type={"text"}
                  placeholder="Digite o estado"
                  register={register}
                  error={errors?.professionalLicenseState?.message}
                />
              </Box>
              <Box width="100%">
                <TextArea
                  name="introduction"
                  label="Experiência profissional"
                  placeholder="Resuma sua experiência profissional"
                  register={register}
                  errorMessage={errors?.introduction?.message}
                />
              </Box>
            </>
          )}

          <Box width="100%" gap="1rem">
            <DefaultButton
              text="Voltar"
              width="15rem"
              type="neutral"
              onClick={() => {
                router.back();
              }}
            />
            <DefaultButton
              text="Salvar"
              width="15rem"
              type="submit"
              onClick={handleSubmit(updateUserProfileData, console.log)}
            />
          </Box>
        </Box>
      </form>
      <Box
        flexDirection="column"
        padding="2rem"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        minHeight="fit-content"
        margin="1rem auto 0 auto"
      >
        <Avatar
          src={imageUrl}
          alt={userData.name}
          size={"large"}
          changeAvatar={handleFileChange}
        />

        {imageUrl !== userData.image && (
          <DefaultButton
            text="Salvar"
            width="fit-content"
            type="submit"
            icon={<RiSave2Fill />}
            onClick={async () => {
              if (imageFile) {
                const url = await upload(imageFile);

                if (url) {
                  updateUserProfileImage(url);
                }
              }
            }}
          />
        )}
      </Box>
    </EditProfileContainer>
  );
}

const EditProfileContainer = styled(Box)`
  width: 100%;
  gap: 2rem;
  overflow: auto;
  padding: 2rem;
  flex-direction: column-reverse;
  align-items: center;

  form {
    max-width: 100%;
    display: flex;
  }

  @media (min-width: 968px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
`;
