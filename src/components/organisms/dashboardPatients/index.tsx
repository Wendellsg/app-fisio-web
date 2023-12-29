"use client";

import Loading from "@/components/LoadingIcon";
import PacienteAvatar, {
  PatientAvatarSkeleton,
} from "@/components/PacienteAvatar";
import { usePatients } from "@/hooks/usePatients";
import { useRouter } from "next/navigation";

export function DashboardPatients() {
  const { Patients, isLoading: LoadingPatients } = usePatients();
  const router = useRouter();

  return (
    <div>
      <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
        Últimos Pacientes
      </h2>
      <div className="flex my-4 overflow-auto p-2 gap-2 scrollbar-hide">
        {LoadingPatients && (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <PatientAvatarSkeleton key={index}/>
            ))}
          </>
        )}

        {Patients?.map((paciente, index) => {
          return (
            <PacienteAvatar
              key={index}
              image={paciente.image}
              name={paciente.name}
              index={index}
              id={paciente._id}
              onClick={() => router.push(`/pacientes/${paciente._id}`)}
            />
          );
        })}
      </div>
    </div>
  );
}
