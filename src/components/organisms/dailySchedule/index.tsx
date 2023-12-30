import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useState } from "react";
import styled from "styled-components";
import { useAppointments } from "../../../hooks/useAppointments";
import { usePatients } from "../../../hooks/usePatients";
import { TAppointment } from "../../../types";
import {
  getAppointments,
  getAppointmentsByHour,
} from "../../../utils/appointments";
import { Paragraph, Title } from "../../atoms/typograph";
import { Modals } from "../../molecules/modals";
import { Appointment } from "../appointment";
import { AppointmentForm } from "../appointmentForm";

export const DailySchedule = ({
  selectedDay,
}: {
  selectedDay: Date;
}) => {
  const { Patients } = usePatients();
  const [selectedAppointment, setSelectedAppointment] =
    useState<TAppointment | null>(null);

  const { appointments } = useAppointments();

  const appointmentsOfDay = getAppointments(selectedDay, appointments || []);

  const appointmentsByHour = getAppointmentsByHour(appointmentsOfDay);

  const hours = Object.keys(appointmentsByHour);

  return (
    <div className="min-w-fit flex flex-col flex-1 md:max-h-full max-h-none overflow-y-auto px-4">
      <h2 className="capitalize whitespace-nowrap text-lg md:text-xl font-bold mt-8 md:mt-0">
        {format(selectedDay, "dd 'de' MMMM 'de' yyyy")}
      </h2>

      <Modals
        isOpen={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        title="Adicionar Agendamento"
      >
        <AppointmentForm
          appointment={selectedAppointment}
          onCancel={() => setSelectedAppointment(null)}
          onSubmit={() => setSelectedAppointment(null)}
        />
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
                {appointmentsByHour[hour].map((appointment) => {
                  const patient = Patients?.find(
                    (patient) => patient._id === appointment.patientId
                  );

                  if (!patient) return null;

                  return (
                    <Appointment
                      appointment={appointment}
                      patient={patient}
                      index={() => {
                        const index = appointmentsOfDay.findIndex(
                          (appointmentOfDay) =>
                            appointmentOfDay._id === appointment._id
                        );
                        return appointmentsOfDay.length - index;
                      }}
                      key={appointment._id}
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
