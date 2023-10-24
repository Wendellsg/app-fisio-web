import { THEME } from "../../theme";
import { Box } from "../atoms/layouts";
import { Paragraph, Title } from "../atoms/typograph";

export const DashboardBadge: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: number;
}> = ({ icon, title, value }) => {
  return (
    <Box flexDirection="column" gap="14px" justifyContent="center" alignItems="center">
      <Box gap="0.5rem" alignItems="center">
        <Box
          borderRadius="50%"
          padding="1rem"
          backgroundColor={THEME.colors.primary}
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Box>

        <Title fontWeight="bold" size="xxl" color="black">{value}</Title>
      </Box>
      <Paragraph fontWeight="bold" size="xs">{title}</Paragraph>
    </Box>
  );
};
