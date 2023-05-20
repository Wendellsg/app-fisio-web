import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiSave2Fill } from "react-icons/ri";
import { useExercises, useWindowsDimensions } from "../../hooks";
import { Exercise, Routine } from "../../types";
import { Input, Label, TextArea } from "../atoms/forms";
import { Box } from "../atoms/layouts";
import { ExerciseCard } from "../ExerciseCard";
import { DefaultButton } from "../molecules/Buttons";
import { SearchInput } from "../molecules/SearchInput";
import { Select } from "../molecules/Select";

export const ActivityForm = ({
  onSubmit,
  routine,
}: {
  onSubmit: (routine: Routine) => void;
  routine?: Routine;
}) => {
  const { exercises, getExercises, searchExercises } = useExercises();
  const [newRoutine, setNewRoutine] = useState<Routine>(routine);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  const { width, height } = useWindowsDimensions();
  const Router = useRouter();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNewRoutine({ ...newRoutine, [name]: value });
  }

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <>
      <Box
        width="100%"
        justifyContent="space-between"
        height="fit-content"
        flexWrap="wrap"
        gap="1rem"
      >
        <h1
          style={{
            margin: 0,
          }}
        >
          {!selectedExercise ? "Selecione o exercício" : selectedExercise.name}
        </h1>
        {!selectedExercise && (
          <Box
            justifyContent="flex-end"
            height="fit-content"
            width="fit-content"
          >
            <SearchInput
              action={(param) => {
                searchExercises({ name: param });
              }}
              placeholder="Pesquisar exercício..."
            />
          </Box>
        )}
      </Box>
      <Box
        justifyContent="space-between"
        height="fit-content"
        flexWrap="wrap"
        alignItems="flex-start"
        width="100%"
        gap="1rem"
      >
        {!selectedExercise && (
          <Box width="100%">
            {exercises.map((exercise) => (
              <ExerciseCard
                exercise={exercise}
                key={exercise._id}
                showFavoritButton
                showAddButton={newRoutine.execerciseId !== exercise._id}
                addAction={(id: string) => {
                  setNewRoutine({
                    ...newRoutine,
                    execerciseId: id,
                  });
                  setSelectedExercise(exercise);
                }}
              />
            ))}
          </Box>
        )}

        {selectedExercise && (
          <Box
            width="100%"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap="1.5rem"
            style={{
              maxWidth: "600px",
              padding: "1rem",
            }}
          >
            <Box height="fit-content" gap="1rem" flexWrap="wrap">
              <Box
                justifyContent="flex-start"
                height="fit-content"
                alignItems="flex-start"
              >
                <Label>Frequência</Label>
                <Input
                  value={newRoutine.frequency}
                  name="frequency"
                  onChange={handleInputChange}
                  minWidth="5rem"
                  placeholder="Vezes por..."
                  type={"number"}
                />
              </Box>
              <Box
                justifyContent="flex-start"
                height="fit-content"
                alignItems="flex-start"
              >
                <Label>Tipo de frequência</Label>
                <Select
                  value={newRoutine.frequencyType}
                  onChange={(value) => {
                    setNewRoutine({
                      ...newRoutine,
                      frequencyType: value,
                    });
                  }}
                  minWidth="5rem"
                  width="fit-content"
                  height="40px"
                  options={[
                    { value: "day", label: "Dia" },
                    { value: "week", label: "Semana" },
                    { value: "month", label: "Mês" },
                  ]}
                  label="Selecionar"
                />
              </Box>
              <Box
                justifyContent="flex-start"
                height="fit-content"
                alignItems="flex-start"
              >
                <Label>Período do dia</Label>
                <Select
                  value={newRoutine.period}
                  onChange={(value) => {
                    setNewRoutine({
                      ...newRoutine,
                      period: value,
                    });
                  }}
                  minWidth="5rem"
                  width="fit-content"
                  height="40px"
                  options={[
                    { value: "morning", label: "Manhã" },
                    { value: "afternoon", label: "Tarde" },
                    { value: "night", label: "Noite" },
                  ]}
                  label="Selecionar"
                />
              </Box>
            </Box>
            <Box height="fit-content" gap="1rem" flexWrap="wrap">
              <Box
                justifyContent="flex-start"
                height="fit-content"
                alignItems="flex-start"
              >
                <Label>Series</Label>
                <Input
                  value={newRoutine.series}
                  name="series"
                  onChange={handleInputChange}
                  minWidth="5rem"
                  placeholder="Quantidade de series"
                  type={"number"}
                />
              </Box>
              <Box
                justifyContent="flex-start"
                height="fit-content"
                alignItems="flex-start"
              >
                <Label>Repetições</Label>
                <Input
                  value={newRoutine.repetitions}
                  name="repetitions"
                  onChange={handleInputChange}
                  minWidth="5rem"
                  placeholder="Quantidade de repetições"
                  type={"number"}
                />
              </Box>
            </Box>
            <Box height="fit-content" gap="1rem" flexWrap="wrap">
              <Box
                justifyContent="flex-start"
                height="fit-content"
                alignItems="flex-start"
              >
                <Label>Descrição</Label>
                <TextArea
                  value={newRoutine.description}
                  name="description"
                  onChange={(e) => {
                    setNewRoutine({
                      ...newRoutine,
                      description: e.target.value,
                    });
                  }}
                  minWidth="15rem"
                  height="10rem"
                  placeholder="Descrição da rotina"
                />
              </Box>
            </Box>
          </Box>
        )}

        {selectedExercise && (
          <Box
            alignItems="center"
            gap="1rem"
            justifyContent="flex-start"
            width="250px"
          >
            <ExerciseCard
              exercise={selectedExercise}
              key={selectedExercise._id}
              showFavoritButton
              showAddButton={false}
              showRemoveButton
              removeAction={(id: string) => {
                setNewRoutine({
                  ...newRoutine,
                  execerciseId: "",
                });
                setSelectedExercise(null);
              }}
            />

            <DefaultButton
              onClick={() => {
                onSubmit(newRoutine);
              }}
              text="Criar rotina"
              type="confirmation"
              icon={<RiSave2Fill />}
              maxWidth="250px"
              width="100%"
            />
            <DefaultButton
              onClick={() => {
                Router.back();
                //createRoutine(newRoutine);
              }}
              text="Cancelar"
              type="negation"
              maxWidth="250px"
              width="100%"
            />
          </Box>
        )}
      </Box>
    </>
  );
};
