import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Appointment } from "../types";

export const getAppointments = (day: Date, appointments: Appointment[]) => {
  const dayString = format(day, "yyyy-MM-dd");
  return appointments?.filter(
    (appointment) =>
      format(
        utcToZonedTime(parseISO(appointment.startDate), "Etc/UTC"),
        "yyyy-MM-dd"
      ) === dayString
  );
};

export const getAppointmentsByHour = (appointments: Appointment[]) => {
  const appointmentsByHour = appointments?.reduce((acc, appointment) => {
    const hour = format(parseISO(appointment.startDate), "HH") + ":00";
    return {
      ...acc,
      [hour]: [...(acc[hour] || []), appointment],
    };
  }, {} as { [key: string]: Appointment[] });

  //Sort appointments by hour

  if (!appointmentsByHour) return [];

  const sorted = Object.keys(appointmentsByHour)
    .sort()
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: appointmentsByHour[key],
      }),
      {}
    );

  return sorted;
};
