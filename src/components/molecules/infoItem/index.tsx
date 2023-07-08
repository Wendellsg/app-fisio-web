import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";

interface InfoItemProps {
  text: string;
  icon: React.ReactNode;
  iconSize?: string;
  onClick?: () => void;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  text,
  icon,
  iconSize,
  onClick,
}) => {
  return (
    <Box
      width="fit-content"
      alignItems="center"
      onClick={onClick}
      style={onClick && { cursor: "pointer" }}
      gap="1rem"
    >
      <Box minWidth={iconSize}>{icon}</Box>

      <Paragraph size="md" fontWeight="bold">
        {text}
      </Paragraph>
    </Box>
  );
};
