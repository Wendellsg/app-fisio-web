import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiSave2Fill } from "react-icons/ri";
import { useExercises, useWindowsDimensions } from "../../hooks";
import { Exercise } from "../../types";
import { Input, Label, TextArea } from "../atoms/forms";
import { CenteredRow, CenteredColumn, HorizontalList } from "../atoms/layouts";
import { ExerciseCard } from "../ExerciseCard";
import { DefaultButton } from "../molecules/Buttons";
import { SearchInput } from "../molecules/SearchInput";
import { Select } from "../molecules/Select";
import { ImageInput } from "../molecules/Imageinput";
import { VideoInput } from "../molecules/VideoInput";

export const ExerciciesForm = ({
  onSubmit,
  exercise,
}: {
  onSubmit: (exercise: Exercise) => void;
  exercise?: Exercise;
}) => {
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    name: exercise?.name || "",
    category: exercise?.category || "",
    description: exercise?.description || "",
    image:
      exercise?.image ||
      "https://static.vecteezy.com/system/resources/previews/001/981/092/original/interracial-athletes-exercising-together-free-vector.jpg",
    summary: exercise?.summary || "",
    video: exercise?.video || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const { width, height } = useWindowsDimensions();
  const Router = useRouter();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNewExercise({ ...newExercise, [name]: value });
  }

  return (
    <>
      <CenteredRow
        justifyContent="space-between"
        height="fit-content"
        wrap="wrap"
        alignItems="flex-start"
        width="100%"
        gap="1rem"
      >
        <CenteredColumn
          width="100%"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="1.5rem"
          style={{
            maxWidth: "600px",
            padding: "1rem",
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
                value={newExercise.name}
                name="name"
                onChange={handleInputChange}
                minWidth="5rem"
                placeholder="Nome do exercício"
                type={"text"}
              />
            </CenteredColumn>
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Categoría</Label>
              <Select
                value={{
                  value: newExercise.category,
                  label: newExercise.category,
                }}
                onChange={(value) => {
                  setNewExercise({
                    ...newExercise,
                    category: value.value,
                  });
                }}
                width="100%"
                height="40px"
                options={[
                  { value: "Pescoço", label: "Pescoço" },
                  { value: "Cabeça", label: "Cabeça" },
                  { value: "Perna", label: "Perna" },
                ]}
                label="Selecionar"
              />
            </CenteredColumn>
          </CenteredRow>
          <CenteredRow height="fit-content" gap="1rem" wrap="wrap">
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Descrição</Label>
              <TextArea
                value={newExercise.description}
                name="description"
                onChange={(e) => {
                  setNewExercise({
                    ...newExercise,
                    description: e.target.value,
                  });
                }}
                minHeight="100px"
                minWidth="5rem"
                placeholder="Descrição do exercício"
              />
            </CenteredColumn>
          </CenteredRow>
          <CenteredRow height="fit-content" gap="1rem" wrap="wrap">
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <Label>Sumário</Label>
              <TextArea
                value={newExercise.summary}
                name="summary"
                onChange={(e) => {
                  setNewExercise({
                    ...newExercise,
                    summary: e.target.value,
                  });
                }}
                minHeight="100px"
                minWidth="5rem"
                placeholder="Sumário do exercício"
              />
            </CenteredColumn>
          </CenteredRow>
          <CenteredRow height="fit-content" gap="1rem" wrap="wrap">
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <ImageInput
                width={"250px"}
                height={"360px"}
                Border={"2px dotted black"}
                onChange={(file: File) => {
                  setImageFile(file);
                  setNewExercise({
                    ...newExercise,
                    image: URL.createObjectURL(file),
                  });
                }}
                value={newExercise.image}
                label={"Imagem"}
                name={"image"}
                borderRadius={"10px"}
                placeholder={"Imagem do exercício"}
              />
            </CenteredColumn>
          </CenteredRow>
          <CenteredRow height="fit-content" gap="1rem" wrap="wrap">
            <CenteredColumn
              justifyContent="flex-start"
              height="fit-content"
              alignItems="flex-start"
            >
              <VideoInput
                width={"100%"}
                height={"auto"}
                onChange={(file: File) => {
                  setImageFile(file);
                  setNewExercise({
                    ...newExercise,
                    video: URL.createObjectURL(file),
                  });
                }}
                value={newExercise.video}
                label={"Video"}
                name={newExercise.name}
              />
            </CenteredColumn>
          </CenteredRow>
          <CenteredRow
            height="fit-content"
            gap="1rem"
            wrap="wrap"
            style={{
              marginTop: "1rem",
            }}
          >
            <DefaultButton
              onClick={() => {
                /*  onSubmit({
                  ...newExercise,
                  image: imageFile,
                } as Exercise); */
              }}
              width="350px"
              text="Salvar"
              type="confirmation"
              icon={<RiSave2Fill />}
            />
          </CenteredRow>
        </CenteredColumn>
      </CenteredRow>
    </>
  );
};
