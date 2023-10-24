import Image from "next/image";
import styles from "./HomeDashboardBadges.module.css";
import { Box } from "../atoms/layouts";
import { HilightedText } from "../atoms/typograph";
import { DashboardBadge } from "./Badge";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
export default function HomeDashboardBadges() {
  return (
    <Box width="100%" flexDirection="column" padding="1rem" gap="2rem">
      <HilightedText>Você tem</HilightedText>
      <Box width="100%" flexWrap="wrap" gap="1rem">
        <DashboardBadge
          title="Pacientes Cadastrados"
          value={300}
          icon={<BsFillPeopleFill size={30} color="#000" />}
        />

        <DashboardBadge
          title="Rotinas Prescritas"
          value={30}
          icon={<AiFillHeart size={30} color="#000" />}
        />

        <DashboardBadge
          title="Rotinas Prescritas"
          value={30}
          icon={<FaClipboardList size={30} color="#000" />}
        />
      </Box>
    </Box>
  );
}
