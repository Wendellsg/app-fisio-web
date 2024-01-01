import { z } from "zod";

export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  profilePicture: string;
  document: string;
  height: number;
  weight: number;
  phone: string;
  email: string;
  address: string;
  adressNumber: string;
  adressComplement: string;
  zipCode: string;
  city: string;
  state: string;
}

export type PatientPreview = {
  _id: string;
  name: string;
  email: string;
  image: string;
};

export interface Exercise {
  _id: string;
  name: string;
  description: string;
  image: string;
  video: string;
  category: string;
  summary: string;
  createdAt: Date;
}
export interface OptionType {
  label: string;
  value: string;
}
export interface Routine {
  _id: string;
  exerciseId: string;
  createdAt: Date;
  professionalId: string;
  description: string;
  frequency: number;
  frequencyType: string;
  repetitions: number;
  series: number;
  period: string;
  activities?: Activity[];
}

export interface Activity {
  _id: string;
  routineId: string;
  createdAt: Date;
  comments: string;
  painLevel: number;
  effortLevel: number;
}

export const routineDataSchema = z.object({
  description: z.string(),
  frequency: z.coerce.number(),
  frequencyType: z.string(),
  repetitions: z.coerce.number(),
  series: z.coerce.number(),
  period: z.string(),
  exerciseId: z.string().nullable(),
});

export type RoutineData = z.infer<typeof routineDataSchema>;

export type activityByDoctor = {
  _id: string;
  createdAt: Date;
  routineId: string;
  patientId: string;
  exerciseId: string | null;
  patientName: string;
  patientImage: string;
  painLevel: number;
  effortLevel: number;
  exerciseName: string;
  exerciseImage: string;
  comments: string;
};

export type TAppointment = {
  _id: string;
  createdAt: string;
  patientId: string;
  professionalId: string;
  startDate: string;
  endDate: string;
  status: AppointmentStatus;
  comments: AppointmentComment[];
};

export type AppointmentComment = {
  _id: string;
  createdAt: string;
  comment: string;
};

export enum AppointmentStatus {
  Scheduled = "scheduled",
  Canceled = "canceled",
  Done = "done",
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

export type Evolution = {
  _id: string;
  professionalId: string;
  patientId: string;
  date: Date;
  clinicalDiagnosis: string;
  physicalDiagnosis: string;
  evolution: string;
};
