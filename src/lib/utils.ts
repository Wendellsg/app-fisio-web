import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Nunito as FontSans } from "next/font/google";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
