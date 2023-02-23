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
  name: String;
  description: String;
  image: String;
  video: String;
  category: String;
  summary: String;
  createdAt: Date;
}

export interface Routine {
  id: string;
  pacientId: string;
  execerciseId: string;
  createdAt: Date;
  description: string;
  frequency: number;
  frequencyType: string;
  repetitions: number;
  series: number;
  period: string;
  activits?: Activity[];
}

export interface Activity {
  id: string;
  routineId: string;
  createdAt: Date;
  pacientId: string;
  execerciseId: string;
  comentary: string;
  painLevel: number;
  effortLevel: number;
}
