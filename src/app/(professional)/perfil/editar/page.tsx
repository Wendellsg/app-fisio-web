"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useUploader } from "@/hooks/useUploader/useUploader";
import { useUserData } from "@/hooks/useUserData";
import { UserUpdateData, userDataSchema } from "@/types/user";
import Loading from "@/components/LoadingIcon";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/molecules/Select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const [imageUrl, setImageUrl] = useState<string | null>(
    userData?.image || null
  );

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
  if (!userData?.name) return <Loading />;

  return (
    <div className="w-full flex flex-col-reverse md:flex-row md:items-start md:justify-center items-center justify-between gap-4 overflow-auto p-4 ">
      <form
        onSubmit={handleSubmit(updateUserProfileData)}
        className="max-w-full flex"
      >
        <div className="flex flex-col w-full gap-4">
          <h2 className="font-bold">Dados pessoais</h2>

          <div className="flex w-full flex-wrap gap-4">
            <Input
              name="name"
              /*   label="Seu nome" */

              type={"text"}
              placeholder="Digite seu nome"
              register={register}
              /* error={errors?.name?.message} */
            />
            <Input
              name="email"
              /*  label="E-mail" */

              type={"text"}
              placeholder="Digite seu e-mail"
              register={register}
              /* error={errors?.email?.message} */
              disabled
            />
          </div>
          <div className="flex w-full flex-wrap gap-4">
            <Input
              name="birthDate"
              /*  label="Data de nascimento" */

              type={"date"}
              placeholder="Sua data de nascimento"
              register={register}
              /* error={errors?.birthDate?.message} */
            />
            <Input
              name="phone"
              /* label="Telefone" */

              type={"text"}
              placeholder="Seu telefone"
              register={register}
              /* error={errors?.phone?.message} */
            />
          </div>

          <div className="flex w-full flex-wrap gap-4">
            <Input
              name="zipCode"
              /* label="CEP" */

              type={"text"}
              placeholder="Seu CEP"
              register={register}
              /*  error={errors?.zipCode?.message} */
            />
            <Input
              name="address"
              /* label="Rua" */

              type={"text"}
              placeholder="Sua rua"
              register={register}
              /*  error={errors?.address?.message} */
            />
          </div>

          <div className="flex w-full flex-wrap gap-4">
            <Input
              name="addressNumber"
              /* label="Número" */

              type={"text"}
              placeholder="Número da sua casa"
              register={register}
              /*  error={errors?.addressNumber?.message} */
            />
            <Input
              name="addressComplement"
              /* label="Complemento" */

              type={"text"}
              placeholder="Apto, bloco, etc."
              register={register}
              /*  error={errors?.addressComplement?.message} */
            />
          </div>

          <div className="flex w-full flex-wrap gap-4">
            <Input
              name="addressNeighborhood"
              /* label="Bairro" */

              type={"text"}
              placeholder="Seu bairro"
              register={register}
              /* error={errors?.addressNeighborhood?.message} */
            />
            <Input
              name="addressCity"
              /* label="Cidade" */
              type={"text"}
              placeholder="Sua cidade"
              register={register}
              /*  error={errors?.addressCity?.message} */
            />
          </div>

          <div className="flex w-full flex-wrap gap-4">
            <Input
              name="addressState"
              /* label="Estado" */

              type={"text"}
              placeholder="Seu estado"
              register={register}
              /*  error={errors?.addressState?.message} */
            />

            <Input
              name="addressCountry"
              /* label="País" */
              type={"text"}
              placeholder="Seu país"
              register={register}
              /* error={errors?.addressCountry?.message} */
            />
          </div>

          <div className="flex w-full items-center gap-2">
            <Switch
              name="isProfessional"
              /*               errorMessage={errors?.isProfessional?.message}
               */ checked={watch("isProfessional")}
              id="isProfessional"
              onCheckedChange={(value) => {
                setValue("isProfessional", value);
              }}
            />

            <Label htmlFor="isProfessional">
              Você é profissional da saúde?
            </Label>
          </div>

          {watch("isProfessional") && (
            <>
              <h2 color="black" style={{ marginTop: "2rem" }}>
                Dados Profissionais
              </h2>

              <div className="flex w-full flex-wrap gap-4">
                <Select
                  /*  label="Profissão" */
                  value={watch("profession") && watch("profession")}
                  options={[
                    { value: "Fisioterapeura", label: "Fisioterapeura" },
                    {
                      value: "Teraupeuta Ocupacional",
                      label: "Teraupeuta Ocupacional",
                    },
                    { value: "Educador Físico", label: "Educador Físico" },
                  ]}
                  onChange={(value) => {
                    setValue("profession", value);
                  }}
                  placeholder="Profissão"
                  /*  error={errors?.profession?.message} */
                />

                <Input
                  name="professionalLicense"
                  /* label="Carteira profissional" */
                  type={"text"}
                  placeholder="Crefito ou Cref"
                  register={register}
                  /*  error={errors?.addressState?.message} */
                />
              </div>

              <div>
                <Input
                  name="professionalLicenseState"
                  /* label="Estado da carteira profissional" */

                  type={"text"}
                  placeholder="Digite o estado"
                  register={register}
                  /* error={errors?.professionalLicenseState?.message} */
                />
              </div>
              <div className="w-full">
                <Label htmlFor="introduction">Experiência profissional</Label>
                <Textarea
                  placeholder="Resuma sua experiência profissional"
                  {...register("introduction")}
                  /* errorMessage={errors?.introduction?.message} */
                />
              </div>
            </>
          )}

          <div className="flex w-full gap-4">
            <Button
              variant="outline"
              onClick={() => {
                router.back();
              }}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit(updateUserProfileData, console.log)}
            >
              Salvar
            </Button>
          </div>
        </div>
      </form>
      <div className="flex flex-col gap-4 justify-center items-center min-h-fit mt-4 mx-auto">
        <Avatar className="w-32 h-32">
          <AvatarImage src={imageUrl || ""} />
          <AvatarFallback>
            {userData?.name?.split(" ")[0][0]}
            {userData?.name?.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>

        {imageUrl !== userData.image ? (
          <>
            <Button
              type="submit"
              onClick={async () => {
                if (imageFile) {
                  const url = await upload(imageFile);

                  if (url) {
                    updateUserProfileImage(url);
                  }
                }
              }}
            >
              Salvar
            </Button>

            <Button
              onClick={async () => {
                setImageUrl(userData.image);
                setImageFile(null);
              }}
              variant={"outline"}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <Button>
            <label htmlFor="image">Alterar foto</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </Button>
        )}
      </div>
    </div>
  );
}
