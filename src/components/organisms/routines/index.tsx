import RoutineCard from "@/components/RoutineCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { getSession } from "@/lib/auth.guard";
import { translateFrequencyType, translatePeriodType } from "@/types";
import { AiFillSchedule } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import { FaSun } from "react-icons/fa6";
import { TiArrowRepeat } from "react-icons/ti";

export const PatientRoutines = async () => {
  const session = getSession();

  const routines = await prisma?.routine.findMany({
    where: {
      userId: session?.id,
    },
    include: {
      exercise: {
        select: {
          id: true,
          name: true,
          video: true,
          image: true,
          summary: true,
          description: true,
        },
      },
      professional: {
        select: {
          id: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
      activities: true,
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <div>
      {routines?.map((routine) => (
        <RoutineCard key={routine.id} routine={routine} />
      ))}

      {!routines?.length && (
        <div className="flex w-full h-full items-center justify-start text-sm">
          <p>Nenhuma rotina encontrada</p>
        </div>
      )}
    </div>
  );
};

export const RoutineData = async ({ routineId }: { routineId: string }) => {
  const routine = await prisma?.routine.findUnique({
    where: {
      id: routineId,
    },
    include: {
      exercise: {
        select: {
          id: true,
          name: true,
          video: true,
          image: true,
          summary: true,
          description: true,
        },
      },
      professional: {
        select: {
          id: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
      activities: true,
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!routine) return <p>Rotina não encontrada</p>;

  return (
    <div className="flex flex-col lg:flex-row items-start justify-start w-full h-full gap-4 lg:p-4 overflow-y-auto">
      <VideoPlayer
        backUrl="/rotinas"
        name={routine.exercise?.name}
        video={routine.exercise?.video || ""}
        image={routine.exercise?.image || ""}
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
          <div className="mt-4">
            <h3 className="font-bold mb-2">Receitado por:</h3>
            <div className="flex items-center gap-4">
              <img
                src={routine?.professional?.user.image || ""}
                alt={routine?.professional?.user.name}
                className="w-10 h-10 rounded-full"
              />
              <p className="font-bold">{routine?.professional?.user.name}</p>
            </div>
          </div>

          <div className="flex gap-4 items-center bg-white p-2 rounded-md ">
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
