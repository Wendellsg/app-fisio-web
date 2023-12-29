"use client";

import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import styled from "styled-components";
import {
  AppointmentStatus,
  TAppointment,
  translateAppointmentStatus,
} from "../../../types";
import { Patient } from "../../../types/user";
import { THEME } from "@/theme";
import { useMemo } from "react";

export const Appointment = ({
  appointment,
  patient,
  onClick,
  index,
}: {
  appointment: TAppointment;
  patient: Patient;
  onClick: () => void;
  index: () => number;
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        animationDelay: `${index() * 0.05}s`,
      }}
      className="scale-up-tl bg-cyan-50 p-4 rounded-md gap-4 flex items-center max-w-full min-w-fit cursor-pointer"
    >
      <div className="w-20 h-20 object-cover rounded-full bg-white p-1 border-accent border-2">
        <img
          src={
            patient.image ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          alt={patient.name}
          className="w-full h-full rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold whitespace-nowrap w-full rounded-md p-3 bg-accent">
          {patient.name.length > 20
            ? patient.name.slice(0, 20) + "..."
            : patient.name}
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
const AppointmentBadge: React.FC<{
  status: AppointmentStatus;
  children: React.ReactNode;
}> = ({ status, children }) => {
  const bgColor = useMemo(() => {
    switch (status) {
      case AppointmentStatus.Scheduled:
        return THEME.colors.sky;
      case AppointmentStatus.Done:
        return THEME.colors.success;
      case AppointmentStatus.Canceled:
        return THEME.colors.danger;
      default:
        return THEME.colors.sky;
    }
  }, [status]);

  return (
    <p
      className={`w-fit rounded-md py-2 px-4 text-xs font-bold text-white bg-[${bgColor}]`}
    >
      {children}
    </p>
  );
};
