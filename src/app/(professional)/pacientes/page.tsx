import { PatientListSkeleton } from "@/components/PacienteAvatar";
import { PatientList } from "@/components/organisms/patients";
import { ProfessionalRequests } from "@/components/organisms/requests";
import { RequestService } from "@/services/request.service";

import { UsersService } from "@/services/users.service";
import { Suspense } from "react";

export default async function PatientsPage() {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-8 p-8">
      <div className="flex w-full items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg bg-accent p-2 rounded-xl font-bold">
          Seus Pacientes
        </h2>
      </div>

      <Suspense fallback={<PatientListSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <Patients />
      </Suspense>

      <div className="flex w-full items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg bg-accent p-2 rounded-xl font-bold">
          Solicitações de Pacientes
        </h2>
      </div>

      <Suspense fallback={<PatientListSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <Requests />
      </Suspense>
    </div>
  );
}

async function Patients() {
  const usersService = new UsersService();

  const patients = await usersService.getPatients();

  return <PatientList patients={patients || []} />;
}

async function Requests() {
  const usersService = new RequestService();

  const requests = await usersService.getProfessionalRequests();

  if (requests instanceof Response) return null;
  return <ProfessionalRequests initialRequests={requests || []} />;
}
