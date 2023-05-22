export interface User {
  name: string;

  email: string;

  password: string;

  resetPasswordToken: string;

  createdAt: Date;

  image: string;

  role: "patient" | "doctor" | "admin";

  doctor: string;
}
