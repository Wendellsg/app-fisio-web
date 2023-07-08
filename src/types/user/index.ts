import { z } from "zod";

export interface User {
  name: string;

  email: string;

  password: string;

  resetPasswordToken: string;

  createdAt: Date;

  image: string;

  isProfessional: boolean;

  isAdmin: boolean;

  doctor: string;

  introduction: string;

  phone: string;

  profession: string;

  professionalLicense: string;

  professionalLicenseState: string;

  professionalLicenseImage: string;

  professionalVerifield: boolean;

  professionalVerifieldAt: Date;

  address: string;

  addressNumber: string;

  addressComplement: string;

  addressNeighborhood: string;

  addressCity: string;

  addressState: string;

  addressZipCode: string;

  addressCountry: string;

  birthDate: string;

  height: number;
  weight: number;

  _id: string;

  patients: {
    userId: string;
    diagnosis: string;
  }[];
}

export interface Patient {
  _id: string;
  name: string;
  email: string;
  image: string;
}

export const userDataSchema = z.object({
  name: z.string().nonempty("Campo obrigatório"),
  email: z
    .string()
    .email("Formato de email inválido")
    .nonempty("Campo obrigatório"),
  phone: z.string().nonempty("Campo obrigatório"),
  birthDate: z.string().nonempty("Campo obrigatório"),
  introduction: z.string(),
  profession: z.string(),
  isProfessional: z.boolean(),
  zipCode: z.string(),
  address: z.string(),
  addressNumber: z.string(),
  addressComplement: z.string(),
  addressNeighborhood: z.string(),
  addressCity: z.string(),
  addressState: z.string(),
  addressCountry: z.string(),
  professionalLicense: z.string(),
  professionalLicenseState: z.string(),
});

export type UserUpdateData = z.infer<typeof userDataSchema>;
