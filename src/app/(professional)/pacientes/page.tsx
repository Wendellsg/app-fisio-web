import { PatientList } from "@/components/organisms/patients";
import { getSession } from "@/lib/auth.guard";
import prisma from "@/lib/prisma";

export default async function Pacientes() {
  const session = getSession();

  const professional = await prisma?.professional.findUnique({
    where: {
      id: session?.id,
    },
  });

  const patients = await prisma?.user.findMany({
    where: {
      professionals: {
        some: {
          id: professional?.id,
        },
      },
    },

    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-8 p-8">
      <div className="flex w-full items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg bg-accent p-2 rounded-xl font-bold">
          Seus Pacientes
        </h2>
      </div>
      <PatientList patients={patients || []} />
    </div>
  );
}
