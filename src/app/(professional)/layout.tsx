import NavMenu, { MenuItem } from "@/components/Nav";
import { AppContainer, PageContent } from "@/components/atoms/layouts";
import { getSessionRole } from "@/lib/session";
import { Role } from "@/types";
import { redirect } from "next/navigation";
import {
  FaCalendarCheck,
  FaDumbbell,
  FaHouse,
  FaUserGroup,
} from "react-icons/fa6";

export default function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = getSessionRole();

  if (role === Role.PATIENT) {
    redirect("/home");
  }

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <FaHouse />,
      href: "/dashboard",
    },
    {
      href: "/agenda",
      icon: <FaCalendarCheck />,
      label: "Agenda",
    },
    {
      label: "Pacientes",
      icon: <FaUserGroup />,
      href: "/pacientes",
    },
    {
      label: "Exercícios",
      icon: <FaDumbbell />,

      href: "/exercicios",
    },
  ];

  return (
    <AppContainer>
      <NavMenu menuItems={menuItems} />
      <PageContent>{children}</PageContent>
    </AppContainer>
  );
}
