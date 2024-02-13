import { UserRoleEnum } from "@prisma/client";
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

export const getInitialRoteByRole = (roles: UserRoleEnum[] | undefined) => {
  if (!roles) {
    return "/login";
  }

  if (roles.includes(UserRoleEnum.admin)) {
    return "/admin";
  }

  if (roles.includes(UserRoleEnum.professional)) {
    return "/dashboard";
  }

  return "/home";
};
