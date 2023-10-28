import { AiFillHeart } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { useUserData } from "../../hooks/useUserData";
import { Box } from "../atoms/layouts";
import { HilightedText } from "../atoms/typograph";
import { DashboardBadge } from "./Badge";
export default function HomeDashboardBadges() {
  const { userData } = useUserData();
  return (
    <Box width="100%" flexDirection="column" padding="1rem" gap="2rem">
      <HilightedText>Você tem</HilightedText>
      <Box width="100%" flexWrap="wrap" gap="1rem">
        <DashboardBadge
          title="Pacientes Cadastrados"
          value={userData.patients.length}
          icon={<BsFillPeopleFill size={30} color="#000" />}
        />

        <DashboardBadge
          title="Rotinas Prescritas"
          value={30}
          icon={<AiFillHeart size={30} color="#000" />}
        />

        <DashboardBadge
          title="Consultas marcadas"
          value={30}
          icon={<FaClipboardList size={30} color="#000" />}
        />
      </Box>
    </Box>
  );
}
