import { translateAppointmentStatus } from "@/types";
import { AppointmentStatusEnum, Prisma } from "@prisma/client";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useMemo } from "react";

export const AppointmentCard = ({
  appointment,
  index,
}: {
  appointment: Prisma.AppointmentGetPayload<{
    include: {
      patient: {
        select: {
          name: boolean;
          image: boolean;
        };
      };
    };
  }>;
  index: () => number;
}) => {
  return (
    <div
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
          {format(utcToZonedTime(appointment.startDate, "Etc/UTC"), "HH:mm")} -
          {format(utcToZonedTime(appointment.endDate, "Etc/UTC"), "HH:mm")}
        </p>

        <AppointmentBadge status={appointment.status}>
          {translateAppointmentStatus(appointment.status)}
        </AppointmentBadge>
      </div>
    </div>
  );
};
export const AppointmentBadge: React.FC<{
  status: AppointmentStatusEnum;
  children: React.ReactNode;
}> = ({ status, children }) => {
  const bgColor = useMemo(() => {
    switch (status) {
      case AppointmentStatusEnum.scheduled:
        return "bg-sky";
      case AppointmentStatusEnum.done:
        return "bg-success";
      case AppointmentStatusEnum.canceled:
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
  appointment: Prisma.AppointmentGetPayload<{
    include: {
      professional: {
        select: {
          id: boolean;
          user: {
            select: {
              name: boolean;
              image: boolean;
            };
          };
        };
      };
    };
  }>;
  onClick?: () => void;
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
            appointment.professional.user.image ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          alt={appointment.professional.user.name}
          className="w-full h-full rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold whitespace-nowrap w-full rounded-md p-2 bg-accent">
          {appointment.professional.user.name.length > 20
            ? appointment.professional.user.name.slice(0, 20) + "..."
            : appointment.professional.user.name}
        </p>

        <p className="font-bold text-gray-400 text-sm">
          {new Date(appointment.startDate).toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "2-digit",
          })}{" "}
          - {format(utcToZonedTime(appointment.startDate, "Etc/UTC"), "HH:mm")}{" "}
          -{format(utcToZonedTime(appointment.endDate, "Etc/UTC"), "HH:mm")}
        </p>

        <AppointmentBadge status={appointment.status}>
          {translateAppointmentStatus(appointment.status)}
        </AppointmentBadge>
      </div>
    </div>
  );
};
