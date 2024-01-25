export enum Role {
  PATIENT = "patient",
  PROFESSIONAL = "professional",
  ADMIN = "admin",
}

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  introduction: string;
  profession: string;
  zipCode: string;
  address: string;
  addressNumber: string;
  addressComplement: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  professionalLicense: string;
  professionalLicenseState: string;
  image: string;
  patients: User[];
  favoriteExercises: Exercise[];
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export enum Category {
  LEGS = "legs",
  ARMS = "arms",
  BACK = "back",
  CHEST = "chest",
  SHOULDERS = "shoulders",
  ABS = "abs",
  CARDIO = "cardio",
}

export type Exercise = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: Category;
  video: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum FrequencyType {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
}

export enum PeriodType {
  MORNING = "morning",
  AFTERNOON = "afternoon",
  NIGHT = "night",
}

export type Routine = {
  id: string;
  professional: User;
  user: User;
  exercise: Exercise;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  frequency: number;
  frequencyType: FrequencyType;
  repetitions: number;
  series: number;
  period: PeriodType;
  activities: Activity[];
};

export type Activity = {
  id: string;
  routine: Routine;
  createdAt: Date;
  comments: string;
  painLevel: number;
  effortLevel: number;
};

export interface OptionType {
  label: string;
  value: string;
}

export enum AppointmentStatus {
  Scheduled = "scheduled",
  Canceled = "canceled",
  Done = "done",
}

export type Appointment = {
  id: string;
  patient: User;
  professional: User;
  startDate: string;
  endDate: string;
  status: AppointmentStatus;
  comments: AppointmentComment[];
  createdAt: Date;
  updatedAt: Date;
};
export type AppointmentComment = {
  id: string;
  createdAt: Date;
  comment: string;
};

export class Evolution {
  id: string;
  professional: User;
  user: User;
  date: Date;
  clinicalDiagnosis: string;
  physicalDiagnosis: string;
  evolution: string;
  createdAt: Date;
  updatedAt: Date;
}

export const translateAppointmentStatus = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.Scheduled:
      return "Agendado";
    case AppointmentStatus.Canceled:
      return "Cancelado";
    case AppointmentStatus.Done:
      return "Realizado";
    default:
      return "";
  }
};
