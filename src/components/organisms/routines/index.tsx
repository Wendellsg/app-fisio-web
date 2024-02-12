"use client";
import Loading from "@/components/LoadingIcon";
import RoutineCard from "@/components/RoutineCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { usePatientRoutines } from "@/hooks/useRoutines";
import { translateFrequencyType, translatePeriodType } from "@/types";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { AiFillSchedule } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import { FaSun } from "react-icons/fa6";
import { TiArrowRepeat } from "react-icons/ti";

export const PatientRoutines = () => {
  const { routines, refetch } = usePatientRoutines();

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
        Suas rotinas
      </h2>

      <div>
        {routines?.map((routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            updateUser={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export const RoutineData = ({ routineId }: { routineId: string }) => {
  const { routines, isLoading } = usePatientRoutines();

  const routine = useMemo(
    () => routines?.find((r) => r.id === routineId),
    [routines, routineId]
  );

  const router = useRouter();
  const goBack = () => router.push("/rotinas");

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading />
      </div>
    );

  if (!routine) return <p>Rotina não encontrada</p>;

  return (
    <div className="flex flex-col lg:flex-row items-start justify-start w-full h-full gap-4 lg:p-4">
      <VideoPlayer
        goBack={goBack}
        name={routine.exercise?.name}
        video={routine.exercise?.video}
        image={routine.exercise?.image}
        className="w-full min-w-full flex-1 lg:min-w-[450px] lg:w-[450px] lg:max-w-[450px]  lg:h-[450px] lg:min-h-[450px]"
      />

      <div className="w-full px-2 pb-4">
        <div className="flex flex-col gap-4  flex-1">
          <h2 className="text-xl font-bold">{routine.exercise?.name}</h2>
          <p className="font-bold text-lg">Resumo</p>
          <p>{routine?.exercise?.summary}</p>
          <p className="font-bold text-lg">Instruções</p>
          <p>{routine?.exercise?.description}</p>
        </div>

        <div className="flex flex-col ml-auto justify-end gap-4 border-t-2 mt-4">
          <div className="flex gap-4 items-center bg-white p-2 rounded-md mt-4">
            <AiFillSchedule size={18} />
            <p className="font-bold whitespace-nowrap">
              {routine?.frequency} por{" "}
              {translateFrequencyType(routine?.frequencyType)}
            </p>
          </div>
          <div className="flex gap-4 items-center  bg-white p-2 rounded-md">
            <FaSun size={18} />
            <p className="font-bold whitespace-nowrap">
              Pela {translatePeriodType(routine.period)}
            </p>
          </div>
          <div className="flex gap-4 items-center  bg-white p-2 rounded-md">
            <CgGym size={18} />
            <p className="font-bold whitespace-nowrap">
              {routine?.series} Series
            </p>
          </div>
          <div className="flex gap-4 items-center  bg-white p-2 rounded-md">
            <TiArrowRepeat size={18} />
            <p className="font-bold whitespace-nowrap">
              {routine.repetitions} Repetições
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
