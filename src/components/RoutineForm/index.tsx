"use client";
import { RoutineData, routineDataSchema } from "@/utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useExercises } from "../../hooks";
import {
  Exercise,
  FrequencyType,
  PeriodType,
  Routine,
  translateFrequencyType,
  translatePeriodType,
} from "../../types";
import { ExerciseCard } from "../ExerciseCard";
import Loading from "../LoadingIcon";
import { SearchInput } from "../molecules/SearchInput";
import { Select } from "../molecules/Select";
import { Button } from "../ui/button";
import { Input, InputBox, InputError } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const RoutineForm = ({
  onSubmit,
  routine,
  exercise = null,
}: {
  onSubmit: (routine: RoutineData) => void;
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
    if (routine.id && routine.exercise.id) {
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
            {routine.id
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
                    key={exercise.id}
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
                      key={selectedExercise.id}
                      showFavoritButton
                      showAddButton={false}
                      showRemoveButton
                      removeAction={() => {
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
                            placeholder="Vezes por..."
                            type={"number"}
                            className="w-full min-w-20"
                            register={register}
                            name="frequency"
                            id="frequency"
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
                            options={Object.keys(FrequencyType).map((key) => ({
                              value: key,
                              label: translateFrequencyType(FrequencyType[key]),
                            }))}
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
                            options={Object.keys(PeriodType).map((key) => ({
                              value: key,
                              label: translatePeriodType(PeriodType[key]),
                            }))}
                            placeholder="Período"
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
                            placeholder="Quantidade de series"
                            type={"number"}
                            register={register}
                            name="series"
                            id="series"
                          />

                          {errors.series?.message && (
                            <InputError>{errors.series?.message}</InputError>
                          )}
                        </InputBox>

                        <InputBox>
                          <Label htmlFor="repetitions">Repetições</Label>
                          <Input
                            register={register}
                            placeholder="Quantidade de repetições"
                            type={"number"}
                            name="repetitions"
                            id="repetitions"
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

                <div className="flex justify-center items-center w-full my-4">
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    className="w-[200px]"
                  >
                    {routine.id ? "Atualizar rotina" : "Criar rotina"}
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
