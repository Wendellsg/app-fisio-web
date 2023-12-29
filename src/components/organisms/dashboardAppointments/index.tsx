'use client'

import { useAppointments } from "@/hooks/useAppointments";
import { usePatients } from "@/hooks/usePatients";
import { getAppointments } from "@/utils/appointments";
import { startOfToday } from "date-fns";
import { useMemo } from "react";
import { Appointment } from "../appointment";
import { useRouter } from "next/navigation";

export function DashBoardAppointments() {
  const { Patients, isLoading: LoadingPatients } = usePatients();
  const router = useRouter();

  const today = startOfToday();
  const { appointments } = useAppointments();
  const appointmentsOfDay = getAppointments(today, appointments || []);
  const sortedAppointments = useMemo(
    () =>
      appointmentsOfDay.sort((a, b) => {
        const aDate = new Date(a.startDate);
        const bDate = new Date(b.startDate);
        return aDate.getTime() - bDate.getTime();
      }),
    [appointmentsOfDay]
  );

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
        Próximas consultas
      </h2>

      <div className="flex gap-4 pl-4 overflow-x-auto pb-4 mt-8">
        {sortedAppointments?.map((appointment) => {
          const patient = Patients?.find(
            (patient) => patient._id === appointment.patientId
          );

          if (!patient) return null;

          return (
            <Appointment
              appointment={appointment}
              patient={patient}
              index={() => {
                const index = sortedAppointments.findIndex(
                  (appointmentOfDay) => appointmentOfDay._id === appointment._id
                );
                return sortedAppointments.length - index;
              }}
              key={appointment._id}
              onClick={() => router.push(`/schedule`)}
            />
          );
        })}

        {sortedAppointments.length === 0 && (
          <div className="flex w-full h-full items-center justify-center ">
            <p>Não há consultas marcadas para hoje</p>
          </div>
        )}
      </div>
    </div>
  );
}
