"use client";

import {
  useAppointments,
  usePatientAppointments,
} from "@/hooks/useAppointments";

import { getAppointments } from "@/utils/appointments";
import { startOfToday } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { AppointmentCard, PatientAppointmentCard } from "../appointment";

export function DashBoardAppointments() {
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
          return (
            <AppointmentCard
              appointment={appointment}
              index={() => {
                const index = sortedAppointments.findIndex(
                  (appointmentOfDay) => appointmentOfDay.id === appointment.id
                );
                return sortedAppointments.length - index;
              }}
              key={appointment.id}
              onClick={() => router.push(`/agenda`)}
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

export function PatientAppointments() {
  const { appointments } = usePatientAppointments();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
        Próximas consultas
      </h2>

      <div className="flex gap-4 pl-4 overflow-x-auto pb-4 mt-8">
        {appointments?.map((appointment) => {
          return (
            <PatientAppointmentCard
              appointment={appointment}
              index={() => {
                const index = appointments.findIndex(
                  (appointmentOfDay) => appointmentOfDay.id === appointment.id
                );
                return appointments.length - index;
              }}
              key={appointment.id}
              onClick={() => router.push(`/agenda`)}
            />
          );
        })}

        {appointments.length === 0 && (
          <div className="flex w-full h-full items-center justify-center ">
            <p>Não há consultas marcadas para hoje</p>
          </div>
        )}
      </div>
    </div>
  );
}
