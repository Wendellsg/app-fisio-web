import {
  AppointmentStatusEnum,
  RoutineFrequencyTypeEnum,
  RoutinePeriodEnum,
  UserRoleEnum,
} from "@prisma/client";

export interface OptionType {
  label: string;
  value: string;
}

export const translateAppointmentStatus = (status: AppointmentStatusEnum) => {
  switch (status) {
    case AppointmentStatusEnum.scheduled:
      return "Agendado";
    case AppointmentStatusEnum.canceled:
      return "Cancelado";
    case AppointmentStatusEnum.done:
      return "Realizado";
    default:
      return "";
  }
};

export const translateFrequencyType = (type: RoutineFrequencyTypeEnum) => {
  switch (type) {
    case RoutineFrequencyTypeEnum.day:
      return "Dia";
    case RoutineFrequencyTypeEnum.week:
      return "Semana";
    case RoutineFrequencyTypeEnum.month:
      return "Mês";
    default:
      return "";
  }
};

export const translatePeriodType = (type: RoutinePeriodEnum) => {
  switch (type) {
    case RoutinePeriodEnum.morning:
      return "Manhã";
    case RoutinePeriodEnum.afternoon:
      return "Tarde";
    case RoutinePeriodEnum.night:
      return "Noite";
    default:
      return "";
  }
};

export type Session = {
  id: string;
  name: string;
  email: string;
  image: string;
  roles: UserRoleEnum[];
};
