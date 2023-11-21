import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useExercises } from "../../hooks";
import { Exercise, Routine, RoutineData, routineDataSchema } from "../../types";
import { ExerciseCard } from "../ExerciseCard";
import LoadingIcon from "../LoadingIcon";
import { Box } from "../atoms/layouts";
import { Paragraph, Title } from "../atoms/typograph";
import { DefaultButton } from "../molecules/Buttons";
import { SearchInput } from "../molecules/SearchInput";
import { Select } from "../molecules/Select";
import { Input, TextArea } from "../molecules/forms";

export const RoutineForm = ({
  onSubmit,
  routine,
  exercise,
}: {
  onSubmit: (routine: Routine) => void;
  routine?: Routine;
  exercise?: Exercise;
}) => {
  const { exercises, getExercises, searchExercises } = useExercises();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    exercise || null
  );

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RoutineData>({
    resolver: zodResolver(routineDataSchema),
    defaultValues: routine || {},
  });

  useEffect(() => {
    setLoading(true);
    if (routine._id && routine.exerciseId) {
      setSelectedExercise(exercise);
      setLoading(false);
    } else {
      getExercises().then(() => {
        setLoading(false);
      });
    }

    return () => {
      setSelectedExercise(null);
    };
  }, []);

  return (
    <Box width="100%" flexDirection="column">
      {loading && (
        <Box
          width="600px"
          maxWidth="80vw"
          height="500px"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="1rem"
        >
          <LoadingIcon />
          <Paragraph fontWeight="bold">
            {routine._id
              ? "Carregando exercício..."
              : "Carregando exercícios..."}
          </Paragraph>
        </Box>
      )}

      {!loading && (
        <>
          <Box
            width="100%"
            justifyContent="flex-start"
            height="fit-content"
            flexWrap="wrap"
            gap="1rem"
            margin="2rem 0"
            flexDirection="column"
          >
            <Box flexDirection="column" gap="1rem">
              <Title
                style={{
                  margin: 0,
                }}
              >
                {!selectedExercise
                  ? "Selecione o exercício"
                  : selectedExercise.name}
              </Title>
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
                    showAddButton={true}
                    addAction={(id: string) => {
                      setValue("exerciseId", id);
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
                        setValue("exerciseId", null);

                        setSelectedExercise(null);
                      }}
                    />
                  </Box>
                  <form onSubmit={handleSubmit(onSubmit, console.log)}>
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
                          name="frequency"
                          minWidth="80px"
                          width="100%"
                          maxWidth="fit-content"
                          placeholder="Vezes por..."
                          type={"number"}
                          label="Frequência"
                          register={register}
                          error={errors.frequency?.message}
                        />

                        <Select
                          value={
                            watch("frequencyType") && {
                              value: watch("frequencyType"),
                              label: watch("frequencyType"),
                            }
                          }
                          onChange={(value) => {
                            setValue("frequencyType", value?.value);
                          }}
                          minWidth="200px"
                          maxWidth="fit-content"
                          width="100%"
                          height="40px"
                          options={[
                            { value: "Dia", label: "Dia" },
                            { value: "Semana", label: "Semana" },
                            { value: "Mês", label: "Mês" },
                          ]}
                          label="Tipo de frequência"
                          error={errors.frequencyType?.message}
                        />
                        <Select
                          label="Período do dia"
                          maxWidth="fit-content"
                          value={
                            watch("period") && {
                              value: watch("period"),
                              label: watch("period"),
                            }
                          }
                          onChange={(value) => {
                            setValue("period", value?.value);
                          }}
                          minWidth="200px"
                          width="100%"
                          height="40px"
                          options={[
                            { value: "Manhã", label: "Manhã" },
                            { value: "Tarde", label: "Tarde" },
                            { value: "Noite", label: "Noite" },
                          ]}
                          error={errors.period?.message}
                        />
                      </Box>

                      <Box
                        height="fit-content"
                        gap="1rem"
                        flexWrap="wrap"
                        width="100%"
                      >
                        <Input
                          name="series"
                          register={register}
                          minWidth="5rem"
                          placeholder="Quantidade de series"
                          type={"number"}
                          label="Series"
                          maxWidth="fit-content"
                          error={errors.series?.message}
                        />

                        <Input
                          name="repetitions"
                          register={register}
                          minWidth="5rem"
                          placeholder="Quantidade de repetições"
                          type={"number"}
                          label="Repetições"
                          maxWidth="fit-content"
                          error={errors.repetitions?.message}
                        />
                      </Box>

                      <Box
                        justifyContent="flex-start"
                        height="fit-content"
                        alignItems="flex-start"
                        width="100%"
                      >
                        <TextArea
                          name="description"
                          register={register}
                          placeholder="Descrição da rotina"
                          label="Descrição"
                          width="100%"
                          errorMessage={errors.description?.message}
                        />
                      </Box>
                    </Box>
                  </form>
                </Box>

                <Box
                  width="100%"
                  alignItems="center"
                  gap="1rem"
                  justifyContent="center"
                  margin="1rem 0"
                >
                  <DefaultButton
                    onClick={handleSubmit(onSubmit)}
                    text={routine._id ? "Atualizar rotina" : "Criar rotina"}
                    type="submit"
                    width="200px"
                  />
                </Box>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
