import {
  AppointmentsSkeleton,
  PatientAppointments,
} from "@/components/organisms/dashboardAppointments";
import {
  HomeProfessionals,
  HomeProfessionalsSkeleton,
} from "@/components/organisms/professionals";
import { PatientRoutines } from "@/components/organisms/routines";
/* import { PatientRoutines } from "@/components/organisms/routines";  */
import { Greeter } from "@/components/ui/greeter";
import { ProfileMenu, ProfileMenuSkeleton } from "@/components/ui/profile-menu";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col justify-between w-full gap-8 max-w-full overflow-y-auto overflow-x-hidden">
      <div className="w-full justify-between md:p-4">
        <div className="flex w-full items-start justify-between p-4 md:p-0">
          <Greeter />

          <Suspense fallback={<ProfileMenuSkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <ProfileMenu />
          </Suspense>
        </div>

        <div className="mt-8">
          <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
            Seus profissionais
          </h2>
          <Suspense fallback={<HomeProfessionalsSkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <HomeProfessionals />
          </Suspense>
        </div>

        <div className="flex flex-col gap-4 max-w-full">
          <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
            Próximas consultas
          </h2>
          <Suspense fallback={<AppointmentsSkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <PatientAppointments />
          </Suspense>
        </div>

        <div className="flex flex-col gap-4 max-w-full">
          <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
            Suas rotinas
          </h2>
          <Suspense fallback={""}>
            {/* @ts-expect-error Async Server Component */}
            <PatientRoutines />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
