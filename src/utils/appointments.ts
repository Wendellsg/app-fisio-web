import { format, parse } from "date-fns";
import { TAppointment } from "../types";

export const getAppointments = (day: Date, appointments: TAppointment[]) => {
  const dayString = format(day, "yyyy-MM-dd");
  return appointments.filter(
    (meeting) =>
      format(
        parse(meeting.startDate.toString(), "yyyy-MM-dd'T'HH:mm", new Date()),
        "yyyy-MM-dd"
      ) === dayString
  );
};

export const getAppointmentsByHour = (appointments: TAppointment[]) => {
  const appointmentsByHour = appointments.reduce((acc, appointment) => {
    const hour =
      format(
        parse(
          appointment.startDate.toString(),
          "yyyy-MM-dd'T'HH:mm",
          new Date()
        ),
        "HH"
      ) + ":00";
    return {
      ...acc,
      [hour]: [...(acc[hour] || []), appointment],
    };
  }, {} as { [key: string]: TAppointment[] });

  return appointmentsByHour;
};
