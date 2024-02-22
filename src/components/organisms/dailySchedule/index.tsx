"use client";
import { useUserData } from "@/hooks/useUserData";
import { AppointmentGetPayload } from "@/types";
import { UserRoleEnum } from "@prisma/client";
import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useAppointments } from "../../../hooks/useAppointments";
import {
  getAppointments,
  getAppointmentsByHour,
} from "../../../utils/appointments";
import { AppointmentCard, PatientAppointmentCard } from "../appointment";
import { AppointmentForm } from "../appointmentForm";

export const DailySchedule = ({ selectedDay }: { selectedDay: Date }) => {
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
                {appointmentsByHour[hour].map(
                  (appointment: AppointmentGetPayload) => {
                    if (userData?.roles?.includes(UserRoleEnum.professional)) {
                      return (
                        <AppointmentForm
                          appointment={appointment}
                          trigger={
                            <button>
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
                              />
                            </button>
                          }
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
                        /* onClick={() => setSelectedAppointment(appointment)} */
                      />
                    );
                  }
                )}
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
