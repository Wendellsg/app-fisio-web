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
import { Input, Label, TextArea } from "../../../../src/components/atoms/forms";
import { Select } from "../../../../src/components/molecules/Select";
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
        wrap="wrap"
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

      <CenteredRow
        justifyContent="flex-start"
        height="fit-content"
        wrap="wrap"
        alignItems="flex-start"
      >
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
                <Label>Frequência</Label>
                <Input
                  value={newRoutine.frequency}
                  name="frequency"
                  onChange={handleInputChange}
                  minWidth="5rem"
                  placeholder="Vezes por..."
                  type={"number"}
                />
              </CenteredColumn>
              <CenteredColumn
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
              </CenteredColumn>
              <CenteredColumn
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
              </CenteredColumn>
            </CenteredRow>
            <CenteredRow height="fit-content" gap="1rem" wrap="wrap">
              <CenteredColumn
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
              </CenteredColumn>
              <CenteredColumn
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
                  value={newRoutine.description}
                  name="series"
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
              </CenteredColumn>
            </CenteredRow>
          </CenteredColumn>
        )}
      </CenteredRow>
    </PageContainer>
  );
};

export default NewRotineScreen;
