"use client";
import { usePatientRoutines } from "@/hooks/useRoutines";

export const PatientRoutines = () => {
  const { routines } = usePatientRoutines();

  console.log(routines);

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
        Suas rotinas
      </h2>
    </div>
  );
};
