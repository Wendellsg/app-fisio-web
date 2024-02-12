"use client";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillSchedule } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import { FaSun, FaTrash } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import { TiArrowRepeat } from "react-icons/ti";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/Apis";
import {
  Routine,
  translateFrequencyType,
  translatePeriodType,
} from "../../types";
import { RoutineForm } from "../RoutineForm";
import { Modals } from "../molecules/modals";
import { Activities } from "../organisms/activities";
import { Button } from "../ui/button";

export default function RoutineCard({
  routine,
  updateUser = () => {},
}: {
  routine: Routine;
  updateUser?: () => void;
}) {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const { fisioFetcher } = useApi();
  const [showActivities, setShowActivities] = useState<boolean>(false);
  const { userData } = useUserData();
  const router = useRouter();

  return (
    <>
      <Modals
        isOpen={!!selectedRoutine}
        onClose={() => setSelectedRoutine(null)}
      >
        <RoutineForm
          routine={selectedRoutine as Routine}
          exercise={routine.exercise}
          onSubmit={async (editedRoutine) => {
            await fisioFetcher({
              url: `/users/${routine.user.id}/routines/${selectedRoutine?.id}`,
              method: "PATCH",
              data: {
                ...selectedRoutine,
                ...editedRoutine,
              },
              callback: () => {
                updateUser();
                setSelectedRoutine(null);
                toast.success("Rotina atualizada com sucesso");
              },
            });

            return;
          }}
        />
      </Modals>

      <Modals
        isOpen={showActivities}
        onClose={() => setShowActivities(false)}
        title={`Atividades - ${routine.exercise?.name}`}
      >
        <Activities routine={routine} />
      </Modals>

      <div
        className={`relative overflow-hidden border rounded-xl shadow-sm flex p-4 flex-col flex-1 w-80 min-w-80 ma-w-[90vw] bg-cover h-96 bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url("${routine.exercise?.image}")`,
          cursor: userData?.id === routine.user.id ? "pointer" : "default",
        }}
        onClick={() => {
          if (userData?.id !== routine.user.id) return;
          router.push(`/rotinas/${routine.id}`);
        }}
      >
        <div className="flex flex-wrap w-full z-10">
          <h2 className="text-lg  font-bold text-black bg-primary p-2 rounded-md mb-4">
            {routine.exercise?.name}
          </h2>

          <div className="flex gap-4 ml-auto">
            <Button
              onClick={() => setShowActivities(true)}
              className="rounded-lg "
            >
              <MdShowChart size={20} />
            </Button>

            {userData?.id === routine.professional.id && (
              <>
                <Button
                  onClick={() => setSelectedRoutine(routine)}
                  className="rounded-lg "
                >
                  <RiEditBoxFill size={20} />
                </Button>
                <Button className="rounded-lg ">
                  <FaTrash size={20} />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex  w-full gap-4 mt-4  z-10">
          <div className="flex flex-col ml-auto justify-end gap-4 items-end">
            <div className="flex gap-4 items-center bg-white p-2 rounded-md">
              <p className="font-bold whitespace-nowrap">
                {routine.frequency} por{" "}
                {translateFrequencyType(routine.frequencyType)}
              </p>
              <AiFillSchedule size={18} />
            </div>
            <div className="flex gap-4 items-center  bg-white p-2 rounded-md">
              <p className="font-bold whitespace-nowrap">
                Pela {translatePeriodType(routine.period)}
              </p>
              <FaSun size={18} />
            </div>
            <div className="flex gap-4 items-center  bg-white p-2 rounded-md">
              <p className="font-bold whitespace-nowrap">
                {routine.series} Series
              </p>
              <CgGym size={18} />
            </div>
            <div className="flex gap-4 items-center  bg-white p-2 rounded-md">
              <p className="font-bold whitespace-nowrap">
                {routine.repetitions} Repetições
              </p>
              <TiArrowRepeat size={18} />
            </div>
          </div>
        </div>
        <p className=" z-10 font-bold max-h-20 mt-auto overflow-ellipsis overflow-hidden">
          {routine.description}
        </p>
        <div className="absolute backdrop:blur-md w-full h-full top-0 left-0 from-slate-500/50 to-transparent bg-gradient-to-t" />
      </div>
    </>
  );
}
