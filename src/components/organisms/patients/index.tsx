"use client";
import PacienteAvatar, {
  PatientListSkeleton
} from "@/components/PacienteAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePatients } from "@/hooks/usePatients";
import { User } from "@prisma/client";
import { BsPlus } from "react-icons/bs";
import { NewPatientModal } from "../newPartientModal";

export function PatientList({ patients }: { patients: Partial<User>[] }) {
  const { filteredPatients, isLoading, refetch, setSearchInput } =
    usePatients(patients);

  return (
    <>
      <div className="flex gap-4 w-full h-fit justify-end md:max-w-full">
        <Input
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Pesquisar Paciente..."
          className="w-full max-w-72"
        />

        <NewPatientModal
          trigger={
            <Button variant="default">
              <BsPlus className="text-2xl font-bold" />
            </Button>
          }
          refetch={refetch}
        />
      </div>
      <div className="w-full grid grid-cols-[1fr] sm:grid-cols-[repeat(auto-fill,_120px)] gap-4 my-8 justify-center p-4">
        {filteredPatients?.map((patient, index) => {
          return (
            <PacienteAvatar
              key={patient.id || index}
              index={index}
              image={patient.image || ""}
              name={`${patient.name}`}
              url={`/pacientes/${patient.id}`}
              id={patient.id || ""}
            />
          );
        })}

        {isLoading &&
         <PatientListSkeleton/>}
      </div>
    </>
  );
}
