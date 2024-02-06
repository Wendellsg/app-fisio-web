"use client";
import PacienteAvatar, {
  PatientAvatarSkeleton,
} from "@/components/PacienteAvatar";
import { useProfessionals } from "@/hooks/useProfessionals";
import { useRouter } from "next/navigation";

export function HomeProfessionals() {
  const { professionals, isLoading } = useProfessionals();
  const router = useRouter();

  return (
    <div>
      <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
        Seus profissionais
      </h2>
      <div className="flex my-4 overflow-auto p-2 gap-2 scrollbar-hide">
        {isLoading && (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <PatientAvatarSkeleton key={index} />
            ))}
          </>
        )}

        {professionals?.map((paciente, index) => {
          return (
            <PacienteAvatar
              key={index}
              image={paciente.image}
              name={paciente.name}
              index={index}
              id={paciente.id}
              onClick={() => router.push(`/professionals/${paciente.id}`)}
            />
          );
        })}
      </div>
    </div>
  );
}
