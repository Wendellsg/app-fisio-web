"use client";
import { translateFrequencyType, translatePeriodType } from "@/types";
import { RoutineData, routineDataSchema } from "@/utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Prisma,
  RoutineFrequencyTypeEnum,
  RoutinePeriodEnum,
} from "@prisma/client";
import { useForm } from "react-hook-form";
import { ExerciseCard } from "../ExerciseCard";
import { Select } from "../molecules/Select";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input, InputBox, InputError } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const RoutineForm = ({
  onSubmit,
  routine,
  trigger,
}: {
  onSubmit: (routine: RoutineData) => void;
  trigger: React.ReactNode;
  routine: Prisma.RoutineGetPayload<{
    include: {
      exercise: {
        select: {
          id: boolean;
          name: boolean;
          image: boolean;
          video: boolean;
          summary: boolean;
          description: boolean;
        };
      };
    };
  }>;
}) => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {
          //TODO: Select Exercise
        }

        {routine.exercise.id && (
          <div className="flex flex-col h-fit pb-8">
            <div className="w-full flex justify-center items-start flex-wrap my-auto h-fit">
              <div className="flex flex-col gap-4 min-h-fit w-fit justify-start items-center">
                <ExerciseCard
                  exercise={routine.exercise}
                  key={routine.exercise.id}
                  showFavoritButton
                  showAddButton={false}
                  showRemoveButton
                  removeAction={() => {
                    setValue("exerciseId", null);
                  }}
                />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                      <Label htmlFor="frequencyType">Tipo de frequência</Label>
                      <Select
                        value={watch("frequencyType") && watch("frequencyType")}
                        onChange={(value) => {
                          setValue("frequencyType", value);
                        }}
                        options={Object.keys(RoutineFrequencyTypeEnum).map(
                          (key) => ({
                            value: key,
                            label: translateFrequencyType(
                              RoutineFrequencyTypeEnum[key]
                            ),
                          })
                        )}
                        placeholder="Tipo de frequência"
                      />
                      {errors.frequencyType?.message && (
                        <InputError>{errors.frequencyType?.message}</InputError>
                      )}
                    </InputBox>

                    <InputBox>
                      <Label htmlFor="period">Período</Label>
                      <Select
                        value={watch("period") && watch("period")}
                        onChange={(value) => {
                          setValue("period", value);
                        }}
                        options={Object.keys(RoutinePeriodEnum).map((key) => ({
                          value: key,
                          label: translatePeriodType(RoutinePeriodEnum[key]),
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
                        <InputError>{errors.repetitions?.message}</InputError>
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
      </DialogContent>
    </Dialog>
  );
};
