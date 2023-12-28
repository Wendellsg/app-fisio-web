import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import "@/styles/globals.css";
import { Nunito as FontSans } from "next/font/google";

import { Metadata } from "next";
import { Providers } from "../providers";

import { cn } from "@/lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

setDefaultOptions({ locale: ptBR });

export const metadata: Metadata = {
  title: "FSIO",
  description: "De fisioterapeuta para fisioterapeuta",
  icons: "/assets/exercicios.png",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
