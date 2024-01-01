"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useExercises } from "../../hooks";
import { Exercise, Routine, RoutineData, routineDataSchema } from "../../types";
import { ExerciseCard } from "../ExerciseCard";
import { Select } from "../molecules/Select";
import Loading from "../LoadingIcon";
import { SearchInput } from "../molecules/SearchInput";
import { Input, InputBox, InputError } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const RoutineForm = ({
  onSubmit,
  routine,
  exercise = null,
}: {
  onSubmit: (routine: Routine) => void;
  routine: Routine;
  exercise?: Exercise | null;
}) => {
  const { exercises, getExercises, searchExercises } = useExercises();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    exercise
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
    <div className="w-full">
      {loading && (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4">
          <Loading />
          <p className="font-bold">
            {routine._id
              ? "Carregando exercício..."
              : "Carregando exercícios..."}
          </p>
        </div>
      )}

      {!loading && (
        <>
          <div className="flex flex-col items-start justify-start w-full h-fit gap-4 mb-4">
            <div className="flex flex-col gap-4">
              <h2 className="m-0 text-md text-slate-500 font-bold">
                {!selectedExercise
                  ? "Selecione o exercício"
                  : "Exercício selecionado"}
              </h2>
              {!selectedExercise && (
                <div className="flex justify-end h-fit w-fit">
                  <SearchInput
                    action={(param) => {
                      searchExercises({ name: param });
                    }}
                    placeholder="Pesquisar exercício..."
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex h-fit flex-wrap justify-between items-start w-full gap-4">
            {!selectedExercise && (
              <div className="flex overflow-y-auto py-4 gap-2">
                {exercises?.map((exercise) => (
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
              </div>
            )}

            {selectedExercise && (
              <div className="flex flex-col h-fit pb-8">
                <div className="w-full flex justify-center items-start flex-wrap my-auto h-fit">
                  <div className="flex flex-col gap-4 min-h-fit w-fit justify-start items-center">
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
                  </div>
                  <form onSubmit={handleSubmit(onSubmit, console.log)}>
                    <div className="flex flex-col w-fit justify-start items-start flex-wrap gap-3 p-4 ">
                      <div className="flex h-fit gap-4 w-full flex-wrap">
                        <InputBox>
                          <Label htmlFor="frequency">Frequência</Label>
                          <Input
                            name="frequency"
                            placeholder="Vezes por..."
                            type={"number"}
                            register={register}
                            className="w-full min-w-20"
                          />

                          {errors.frequency?.message && (
                            <InputError>{errors.frequency?.message}</InputError>
                          )}
                        </InputBox>

                        <InputBox>
                          <Label htmlFor="frequencyType">
                            Tipo de frequência
                          </Label>
                          <Select
                            value={
                              watch("frequencyType") && watch("frequencyType")
                            }
                            onChange={(value) => {
                              setValue("frequencyType", value);
                            }}
                            options={[
                              { value: "Dia", label: "Dia" },
                              { value: "Semana", label: "Semana" },
                              { value: "Mês", label: "Mês" },
                            ]}
                            placeholder="Tipo de frequência"
                          />
                          {errors.frequencyType?.message && (
                            <InputError>
                              {errors.frequencyType?.message}
                            </InputError>
                          )}
                        </InputBox>

                        <InputBox>
                          <Label htmlFor="period">Período</Label>
                          <Select
                            value={watch("period") && watch("period")}
                            onChange={(value) => {
                              setValue("period", value);
                            }}
                            options={[
                              { value: "Manhã", label: "Manhã" },
                              { value: "Tarde", label: "Tarde" },
                              { value: "Noite", label: "Noite" },
                            ]}
                            placeholder="Tipo de frequência"
                          />
                          {errors.period?.message && (
                            <InputError>{errors.period?.message}</InputError>
                          )}
                        </InputBox>
                      </div>

                      <div className="flex h-fit flex-wrap w-full gap-5">
                        <InputBox>
                          <Label htmlFor="series">Series</Label>
                          <Input
                            name="series"
                            register={register}
                            placeholder="Quantidade de series"
                            type={"number"}
                          />

                          {errors.series?.message && (
                            <InputError>{errors.series?.message}</InputError>
                          )}
                        </InputBox>

                        <InputBox>
                          <Label htmlFor="repetitions">Repetições</Label>
                          <Input
                            name="repetitions"
                            register={register}
                            placeholder="Quantidade de repetições"
                            type={"number"}
                          />
                          {errors.repetitions?.message && (
                            <InputError>
                              {errors.repetitions?.message}
                            </InputError>
                          )}
                        </InputBox>
                      </div>

                      <div className="flex h-fit items-start w-full justify-start">
                        <Textarea
                          placeholder="Descrição da rotina"
                          {...register("description")}
                        />

                        {errors.description?.message && (
                          <InputError>{errors.description?.message}</InputError>
                        )}
                      </div>
                    </div>
                  </form>
                </div>

                <div
        
                  className="flex justify-center items-center w-full my-4"
                >
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    className="w-[200px]"
                  >
                    {routine._id ? "Atualizar rotina" : "Criar rotina"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
