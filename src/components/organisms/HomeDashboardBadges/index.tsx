"use client";

import { AiFillHeart } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { useAppointments } from "../../../hooks/useAppointments";
import { useUserData } from "../../../hooks/useUserData";
import { AppointmentStatus } from "../../../types";
import { DashboardBadge } from "./Badge";
export default function HomeDashboardBadges() {
  const { userData } = useUserData();
  const { appointments } = useAppointments();

  const scheduledAppointments = appointments?.filter(
    (appointment) => appointment.status === AppointmentStatus.Scheduled
  );

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <h2 className="font-bold text-lg">Você tem</h2>
      <div className="w-full flex flex-wrap gap-4">
        <DashboardBadge
          title="Pacientes Cadastrados"
          value={userData?.patients?.length || 0}
          icon={<BsFillPeopleFill size={30} color="#000" />}
        />

        <DashboardBadge
          title="Rotinas Prescritas"
          value={30}
          icon={<AiFillHeart size={30} color="#000" />}
        />

        <DashboardBadge
          title="Consultas marcadas"
          value={scheduledAppointments.length}
          icon={<FaClipboardList size={30} color="#000" />}
        />
      </div>
    </div>
  );
}
