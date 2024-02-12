import { useUserData } from "@/hooks/useUserData";
import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useState } from "react";
import { useAppointments } from "../../../hooks/useAppointments";
import { Appointment, Role } from "../../../types";
import {
  getAppointments,
  getAppointmentsByHour,
} from "../../../utils/appointments";
import { Modals } from "../../molecules/modals";
import { AppointmentCard, PatientAppointmentCard } from "../appointment";
import { AppointmentDetails, AppointmentForm } from "../appointmentForm";

export const DailySchedule = ({ selectedDay }: { selectedDay: Date }) => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const { appointments } = useAppointments();

  const { userData } = useUserData();

  const appointmentsOfDay = getAppointments(selectedDay, appointments || []);

  const appointmentsByHour = getAppointmentsByHour(appointmentsOfDay);

  const hours = Object.keys(appointmentsByHour);

  return (
    <div className="min-w-fit flex flex-col flex-1 md:max-h-full max-h-none overflow-y-auto px-4">
      <h2 className="whitespace-nowrap text-lg md:text-xl font-bold mt-8 md:mt-0">
        {format(selectedDay, "dd 'de' MMMM 'de' yyyy")}
      </h2>

      <Modals
        isOpen={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        title={
          userData?.role === Role.PROFESSIONAL
            ? "Adicionar Agendamento"
            : "Detalhes da consulta"
        }
      >
        {userData?.role === Role.PROFESSIONAL ? (
          <AppointmentForm
            appointment={selectedAppointment}
            onCancel={() => setSelectedAppointment(null)}
            onSubmit={() => setSelectedAppointment(null)}
          />
        ) : (
          <AppointmentDetails appointment={selectedAppointment!} />
        )}
      </Modals>

      <div className="flex flex-col w-full gap-2 mt-4 overflow-y-auto">
        {hours.map((hour) => {
          return (
            <div
              key={hour}
              className="grow-from-left-top flex-col flex max-h-fit gap-4"
            >
              <p className="text-lg text-gray-500 font-bold">
                {format(
                  utcToZonedTime(
                    parseISO(
                      new Date().toISOString().split("T")[0] + "T" + hour
                    ),
                    "Etc/UTC"
                  ),
                  "HH:mm"
                )}{" "}
              </p>

              <div className="flex flex-col gap-4 pl-4">
                {appointmentsByHour[hour].map((appointment: Appointment) => {
                  if (userData?.role === Role.PROFESSIONAL) {
                    return (
                      <AppointmentCard
                        appointment={appointment}
                        index={() => {
                          const index = appointmentsOfDay.findIndex(
                            (appointmentOfDay) =>
                              appointmentOfDay.id === appointment.id
                          );
                          return appointmentsOfDay.length - index;
                        }}
                        key={appointment.id}
                        onClick={() => setSelectedAppointment(appointment)}
                      />
                    );
                  }

                  return (
                    <PatientAppointmentCard
                      appointment={appointment}
                      index={() => {
                        const index = appointmentsOfDay.findIndex(
                          (appointmentOfDay) =>
                            appointmentOfDay.id === appointment.id
                        );
                        return appointmentsOfDay.length - index;
                      }}
                      key={appointment.id}
                      onClick={() => setSelectedAppointment(appointment)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}

        {hours.length === 0 && (
          <div className="flex  w-full h-full justify-center items-center">
            <p className="text-sm font-bold">
              Nenhum agendamento para este dia
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
