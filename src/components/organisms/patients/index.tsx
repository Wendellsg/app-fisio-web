"use client";

import PacienteAvatar, {
  PatientAvatarSkeleton,
} from "@/components/PacienteAvatar";
import { Modals } from "@/components/molecules/modals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePatients } from "@/hooks/usePatients";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { NewPatientModal } from "../newPartientModal";

export const PatientList = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { Patients, isLoading } = usePatients();

  const patientsFiltered =
    Patients?.filter((patient) => {
      return patient.name.toLowerCase().includes(searchInput.toLowerCase());
    }) || [];
  return (
    <>
      <Modals
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Adicionar paciente"
      >
        <NewPatientModal onClose={() => setShowModal(false)} />
      </Modals>

      <div className="flex w-full items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg bg-accent p-2 rounded-xl font-bold">
          Seus Pacientes
        </h2>
        <div className="flex gap-4 items-center flex-1 justify-between md:max-w-[300px]">
          <Input
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Pesquisar Paciente..."
          />
          <Button variant="default" onClick={() => setShowModal(true)}>
            <BsPlus className="text-2xl font-bold" />
          </Button>
        </div>
      </div>
      <div className="w-full grid grid-cols-[1fr] sm:grid-cols-[repeat(auto-fill,_120px)] gap-4 my-8 justify-center p-4">
        {isLoading && (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <PatientAvatarSkeleton key={index} />
            ))}
          </>
        )}

        {patientsFiltered?.length > 0
          ? patientsFiltered?.map((pacinte, index) => {
              return (
                <PacienteAvatar
                  key={pacinte.id}
                  index={index}
                  image={pacinte.image}
                  name={`${pacinte.name}`}
                  id={pacinte.id}
                  onClick={() => router.push(`/pacientes/${pacinte.id}`)}
                />
              );
            })
          : !isLoading && <p>Nenhum Paciente encontrado</p>}
      </div>
    </>
  );
};
