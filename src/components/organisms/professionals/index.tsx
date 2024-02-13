import PacienteAvatar, {
  PatientAvatarSkeleton,
} from "@/components/PacienteAvatar";
import { getSession } from "@/lib/auth.guard";

export async function HomeProfessionals() {
  const session = getSession();
  const professionals = await prisma?.professional.findMany({
    where: {
      patients: {
        some: {
          id: session?.id,
        },
      },
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return (
    <div className="flex my-4 overflow-auto p-2 gap-2 scrollbar-hide">
      {!professionals?.length && (
        <div className="flex w-full h-full items-center justify-start text-sm mt-4">
          <p>Você ainda não tem nenhum profissional</p>
        </div>
      )}

      {professionals?.map((professional, index) => {
        return (
          <PacienteAvatar
            key={index}
            image={professional.user.image || ""}
            name={professional.user.name}
            index={index}
            id={professional.id}
            url={`/professionals/${professional.id}`}
          />
        );
      })}
    </div>
  );
}

export function HomeProfessionalsSkeleton() {
  return (
    <div className="flex my-4 overflow-auto p-2 gap-2 scrollbar-hide">
      {Array.from({ length: 5 }).map((_, index) => (
        <PatientAvatarSkeleton key={index} />
      ))}
    </div>
  );
}
