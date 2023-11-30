import { format, parseISO } from "date-fns";
import { TAppointment } from "../types";

export const getAppointments = (day: Date, appointments: TAppointment[]) => {
  const dayString = format(day, "yyyy-MM-dd");
  return appointments?.filter(
    (meeting) => format(parseISO(meeting.startDate), "yyyy-MM-dd") === dayString
  );
};

export const getAppointmentsByHour = (appointments: TAppointment[]) => {
  const appointmentsByHour = appointments?.reduce((acc, appointment) => {
    const hour = format(parseISO(appointment.startDate), "HH") + ":00";
    return {
      ...acc,
      [hour]: [...(acc[hour] || []), appointment],
    };
  }, {} as { [key: string]: TAppointment[] });

  return appointmentsByHour;
};
