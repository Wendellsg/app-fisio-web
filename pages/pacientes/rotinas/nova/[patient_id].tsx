import {
  CenteredColumn,
  CenteredRow,
  HorizontalList,
  PageContainer,
} from "../../../../src/components/atoms/layouts";
import { HilightedText } from "../../../../src/components/atoms/typograph";
import { useRouter } from "next/router";
import * as S from "./styles";
import { SearchInput } from "../../../../src/components/molecules/SearchInput";
import { useExercises } from "../../../../src/hooks";
import { useEffect, useState } from "react";
import { ExerciseCard } from "../../../../src/components/ExerciseCard";
import { Exercise, Routine } from "../../../../src/types";
import { Input, Label } from "../../../../src/components/atoms/forms";
const NewRotineScreen = () => {
  const router = useRouter();
  const { patient_id } = router.query;
  const { exercises, getExercises, searchExercises } = useExercises();
  const [newRoutine, setNewRoutine] = useState<Routine>({} as Routine);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNewRoutine({ ...newRoutine, [name]: value });
  }

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <PageContainer>
      <HilightedText size="large">Nova Rotina</HilightedText>
      <CenteredRow
        width="100%"
        justifyContent="space-between"
        height="fit-content"
      >
        <h1
          style={{
            margin: 0,
          }}
        >
          {!selectedExercise ? "Selecione o exercício" : selectedExercise.name}
        </h1>
        {!selectedExercise && (
          <CenteredRow
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
          </CenteredRow>
        )}
      </CenteredRow>

      <CenteredRow justifyContent="flex-start" height="fit-content">
        {!selectedExercise && (
          <HorizontalList width="100%">
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
          </HorizontalList>
        )}
        {selectedExercise && (
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
        )}

        {selectedExercise && (
          <CenteredColumn
            width="100%"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap="1rem"
          >
            <CenteredRow height="fit-content" gap="1rem" wrap="wrap">
              <CenteredColumn
                justifyContent="flex-start"
                height="fit-content"
                alignItems="flex-start"
              >
                <Label>frequency</Label>
                <Input
                  value={newRoutine.frequency}
                  name="frequency"
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
                  value={newRoutine.period}
                  name="period"
                  onChange={handleInputChange}
                  minWidth="15rem"
                  type={"period"}
                  placeholder="E-mail do paciente"
                />
              </CenteredColumn>
            </CenteredRow>
          </CenteredColumn>
        )}
      </CenteredRow>
    </PageContainer>
  );
};

export default NewRotineScreen;
