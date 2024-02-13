import { AiFillHeart } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";

import { getSession } from "@/lib/auth.guard";
import { DashboardBadge } from "./Badge";
export default async function HomeDashboardBadges() {
  const session = getSession();

  const professional = await prisma?.professional.findUnique({
    where: {
      userId: session?.id,
    },
    select: {
      id: true,
      patients: true,
    },
  });

  const appointments = await prisma?.appointment.findMany({
    where: {
      professionalId: professional?.id,
    },
  });

  const routines = await prisma?.routine.findMany({
    where: {
      professionalId: professional?.id,
    },
  });

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <h2 className="font-bold text-lg">Você tem</h2>
      <div className="w-full flex flex-wrap gap-4">
        <DashboardBadge
          title="Pacientes Cadastrados"
          value={professional?.patients?.length || 0}
          icon={<BsFillPeopleFill size={30} color="#000" />}
        />

        <DashboardBadge
          title="Rotinas Prescritas"
          value={routines?.length || 0}
          icon={<AiFillHeart size={30} color="#000" />}
        />

        <DashboardBadge
          title="Consultas marcadas"
          value={appointments?.length || 0}
          icon={<FaClipboardList size={30} color="#000" />}
        />
      </div>
    </div>
  );
}
