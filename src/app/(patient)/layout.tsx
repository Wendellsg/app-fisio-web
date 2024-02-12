import NavMenu, { MenuItem } from "@/components/Nav";
import { AppContainer, PageContent } from "@/components/atoms/layouts";
import { FaCalendarCheck, FaDumbbell, FaHouse } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";

export default function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems: MenuItem[] = [
    {
      label: "Home",
      icon: <FaHouse />,
      href: "/home",
    },
    {
      label: "Rotinas",
      icon: <FaDumbbell />,
      href: "/rotinas",
    },
    {
      href: "/consultas",
      icon: <FaCalendarCheck />,
      label: "Consultas",
    },

    {
      label: "Perfil",
      icon: <IoPersonSharp />,
      href: "/meu-perfil",
    },
  ];

  return (
    <AppContainer>
      <NavMenu menuItems={menuItems} />
      <PageContent>{children}</PageContent>
    </AppContainer>
  );
}
