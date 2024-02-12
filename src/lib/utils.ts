import { Role } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { Nunito as FontSans } from "next/font/google";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const getInitialRoteByRole = (role: Role) => {
  switch (role) {
    case Role.PROFESSIONAL:
      return "/dashboard";
    case Role.ADMIN:
      return "/admin";
    case Role.PATIENT:
      return "/home";
    default:
      return "/login";
  }
};
