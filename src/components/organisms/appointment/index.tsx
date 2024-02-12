"use client";

import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useMemo } from "react";
import {
  Appointment,
  AppointmentStatus,
  translateAppointmentStatus,
} from "../../../types";

export const AppointmentCard = ({
  appointment,
  onClick,
  index,
}: {
  appointment: Appointment;
  onClick: () => void;
  index: () => number;
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        animationDelay: `${index() * 0.05}s`,
      }}
      className="scale-up-tl bg-gray-100 p-4 rounded-lg gap-4 flex items-center max-w-full min-w-fit w-fit cursor-pointer"
    >
      <div className="w-16 h-16 object-cover rounded-full bg-white p-1 border-accent border-2">
        <img
          src={
            appointment.patient.image ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          alt={appointment.patient.name}
          className="w-full h-full rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold whitespace-nowrap w-full rounded-md p-2 bg-accent">
          {appointment.patient.name.length > 20
            ? appointment.patient.name.slice(0, 20) + "..."
            : appointment.patient.name}
        </p>

        <p className="font-bold text-gray-400 text-sm">
          {format(
            utcToZonedTime(parseISO(appointment.startDate), "Etc/UTC"),
            "HH:mm"
          )}{" "}
          -
          {format(
            utcToZonedTime(parseISO(appointment.endDate), "Etc/UTC"),
            "HH:mm"
          )}
        </p>

        <AppointmentBadge status={appointment.status}>
          {translateAppointmentStatus(appointment.status)}
        </AppointmentBadge>
      </div>
    </div>
  );
};
export const AppointmentBadge: React.FC<{
  status: AppointmentStatus;
  children: React.ReactNode;
}> = ({ status, children }) => {
  const bgColor = useMemo(() => {
    switch (status) {
      case AppointmentStatus.Scheduled:
        return "bg-sky";
      case AppointmentStatus.Done:
        return "bg-success";
      case AppointmentStatus.Canceled:
        return "bg-destructive";
      default:
        return "bg-sky";
    }
  }, [status]);

  return (
    <p
      className={`w-fit rounded-xl py-1 px-2 text-xs font-bold text-white ${bgColor}`}
    >
      {children}
    </p>
  );
};

export const PatientAppointmentCard = ({
  appointment,
  onClick,
  index,
}: {
  appointment: Appointment;
  onClick: () => void;
  index: () => number;
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        animationDelay: `${index() * 0.05}s`,
      }}
      className="scale-up-tl bg-gray-100 p-4 rounded-lg gap-4 flex items-center max-w-full min-w-fit w-fit cursor-pointer"
    >
      <div className="w-16 h-16 object-cover rounded-full bg-white p-1 border-accent border-2">
        <img
          src={
            appointment.professional.image ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          alt={appointment.professional.name}
          className="w-full h-full rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold whitespace-nowrap w-full rounded-md p-2 bg-accent">
          {appointment.professional.name.length > 20
            ? appointment.professional.name.slice(0, 20) + "..."
            : appointment.professional.name}
        </p>

        <p className="font-bold text-gray-400 text-sm">
          {new Date(appointment.startDate).toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "2-digit",
          })}{" "}
          -{" "}
          {format(
            utcToZonedTime(parseISO(appointment.startDate), "Etc/UTC"),
            "HH:mm"
          )}{" "}
          -
          {format(
            utcToZonedTime(parseISO(appointment.endDate), "Etc/UTC"),
            "HH:mm"
          )}
        </p>

        <AppointmentBadge status={appointment.status}>
          {translateAppointmentStatus(appointment.status)}
        </AppointmentBadge>
      </div>
    </div>
  );
};
