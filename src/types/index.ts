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
  id: string;
  routineId: string;
  createdAt: Date;
  patientId: string;
  exercisesId: string;
  commentary: string;
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
  exerciseId: z.string(),
});

export type RoutineData = z.infer<typeof routineDataSchema>;
