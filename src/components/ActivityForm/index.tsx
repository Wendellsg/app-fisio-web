import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useExercises, useWindowsDimensions } from "../../hooks";
import { Exercise, Routine } from "../../types";
import { ExerciseCard } from "../ExerciseCard";
import { Box } from "../atoms/layouts";
import { HilightedText } from "../atoms/typograph";
import { DefaultButton } from "../molecules/Buttons";
import { SearchInput } from "../molecules/SearchInput";
import { Select } from "../molecules/Select";
import { Input, TextArea } from "../molecules/forms";

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
        justifyContent="flex-start"
        height="fit-content"
        flexWrap="wrap"
        gap="1rem"
        margin="2rem 0"
      >
        <Box flexDirection="column" gap="1rem">
          <HilightedText
            style={{
              margin: 0,
            }}
          >
            {!selectedExercise
              ? "Selecione o exercício"
              : selectedExercise.name}
          </HilightedText>
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
          <Box
            width="100%"
            maxWidth="90vw"
            style={{
              overflowY: "auto",
            }}
            padding="1rem 0"
          >
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
            flexDirection="column"
            height="fit-content"
            padding="0 0 2rem 0"
          >
            <Box
              width="100%"
              justifyContent="center"
              gap="2rem"
              alignItems="flex-start"
              flexWrap="wrap"
              margin="0 auto"
              height="fit-content"
            >
              <Box
                alignItems="center"
                gap="1rem"
                justifyContent="flex-start"
                flexDirection="column"
                minWidth="fit-content"
                width="fit-content"
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
              </Box>
              <Box
                width="fit-content"
                justifyContent="flex-start"
                alignItems="flex-start"
                gap="1.5rem"
                style={{
                  padding: "1rem",
                }}
                flexDirection="column"
                maxWidth="600px"
              >
                <Box
                  height="fit-content"
                  gap="1rem"
                  width="100%"
                  flexWrap="wrap"
                >
                  <Input
                    value={newRoutine.frequency}
                    name="frequency"
                    onChange={handleInputChange}
                    minWidth="80px"
                    width="100%"
                    maxWidth="fit-content"
                    placeholder="Vezes por..."
                    type={"number"}
                    label="Frequência"
                  />

                  <Select
                    value={newRoutine.frequencyType}
                    onChange={(value) => {
                      setNewRoutine({
                        ...newRoutine,
                        frequencyType: value,
                      });
                    }}
                    minWidth="200px"
                    maxWidth="fit-content"
                    width="100%"
                    height="40px"
                    options={[
                      { value: "day", label: "Dia" },
                      { value: "week", label: "Semana" },
                      { value: "month", label: "Mês" },
                    ]}
                    label="Tipo de frequência"
                  />
                  <Select
                    label="Período do dia"
                    maxWidth="fit-content"
                    value={newRoutine.period}
                    onChange={(value) => {
                      setNewRoutine({
                        ...newRoutine,
                        period: value,
                      });
                    }}
                    minWidth="200px"
                    width="100%"
                    height="40px"
                    options={[
                      { value: "morning", label: "Manhã" },
                      { value: "afternoon", label: "Tarde" },
                      { value: "night", label: "Noite" },
                    ]}
                  />
                </Box>

                <Box
                  height="fit-content"
                  gap="1rem"
                  flexWrap="wrap"
                  width="100%"
                >
                  <Input
                    value={newRoutine.series}
                    name="series"
                    onChange={handleInputChange}
                    minWidth="5rem"
                    placeholder="Quantidade de series"
                    type={"number"}
                    label="Series"
                    maxWidth="fit-content"
                  />

                  <Input
                    value={newRoutine.repetitions}
                    name="repetitions"
                    onChange={handleInputChange}
                    minWidth="5rem"
                    placeholder="Quantidade de repetições"
                    type={"number"}
                    label="Repetições"
                    maxWidth="fit-content"
                  />
                </Box>

                <Box
                  justifyContent="flex-start"
                  height="fit-content"
                  alignItems="flex-start"
                  width="100%"
                >
                  <TextArea
                    value={newRoutine.description}
                    name="description"
                    onChange={(e) => {
                      setNewRoutine({
                        ...newRoutine,
                        description: e.target.value,
                      });
                    }}
                    placeholder="Descrição da rotina"
                    label="Descrição"
                    width="100%"
                  />
                </Box>
              </Box>
            </Box>
            <Box
              width="100%"
              alignItems="center"
              gap="1rem"
              justifyContent="center"
              margin="1rem 0"
            >
              <DefaultButton
                onClick={() => {
                  onSubmit(newRoutine);
                }}
                text="Criar rotina"
                type="submit"
                width="200px"
              />
              <DefaultButton
                onClick={() => {
                  Router.back();
                  //createRoutine(newRoutine);
                }}
                text="Cancelar"
                type="negation"
                width="200px"
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
