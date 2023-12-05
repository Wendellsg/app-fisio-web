import { AiFillHeart } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { useAppointments } from "../../hooks/useAppointments";
import { useUserData } from "../../hooks/useUserData";
import { AppointmentStatus } from "../../types";
import { Box } from "../atoms/layouts";
import { Title } from "../atoms/typograph";
import { DashboardBadge } from "./Badge";
export default function HomeDashboardBadges() {
  const { userData } = useUserData();
  const { appointments } = useAppointments();

  const scheduledAppointments = appointments?.filter(
    (appointment) => appointment.status === AppointmentStatus.Scheduled
  );

  return (
    <Box width="100%" flexDirection="column" padding="1rem" gap="2rem">
      <Title>Você tem</Title>
      <Box width="100%" flexWrap="wrap" gap="1rem">
        <DashboardBadge
          title="Pacientes Cadastrados"
          value={userData?.patients?.length}
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
      </Box>
    </Box>
  );
}
