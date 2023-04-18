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
    image: exercise?.image || "",
    summary: exercise?.summary || "",
    video: exercise?.video || "",
  });

  const { width, height } = useWindowsDimensions();
  const Router = useRouter();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNewExercise({ ...newExercise, [name]: value });
  }

  return (
    <>
      <CenteredRow
        width="100%"
        justifyContent="space-between"
        height="fit-content"
        wrap="wrap"
        gap="1rem"
      ></CenteredRow>
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
                minWidth="5rem"
                width="fit-content"
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
                minWidth="5rem"
                placeholder="Sumário do exercício"
              />
            </CenteredColumn>
          </CenteredRow>
        </CenteredColumn>
      </CenteredRow>
    </>
  );
};
