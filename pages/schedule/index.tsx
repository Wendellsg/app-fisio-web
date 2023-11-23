import { Box } from "../../src/components/atoms/layouts";
import { Title } from "../../src/components/atoms/typograph";
import { Calendar } from "../../src/components/organisms/calendar";

export default function SchedulePage() {
  return (
    <Box
      width="100%"
      justifyContent="space-between"
      gap="2rem"
      alignItems="flex-start"
      minHeight="80vh"
      padding="2rem"
      flexDirection="column"
    >
      <Title size="lg" withBackground>
        Agenda
      </Title>

      <Box margin="2rem 0">
        <Calendar />
      </Box>
    </Box>
  );
}
