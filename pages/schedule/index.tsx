import { startOfToday } from "date-fns";
import { useState } from "react";
import { Box } from "../../src/components/atoms/layouts";
import { Title } from "../../src/components/atoms/typograph";
import { Calendar } from "../../src/components/organisms/calendar";
import { DailySchedule } from "../../src/components/organisms/dailySchedule";

export default function SchedulePage() {
  const today = startOfToday();

  const [selectedDay, setSelectedDay] = useState(today);

  return (
    <Box
      width="100%"
      justifyContent="space-between"
      gap="2rem"
      alignItems="flex-start"
      minHeight="80vh"
      padding="2rem"
      flexDirection="column"
      height="fit-content"
      style={{
        overflowY: "auto",
      }}
    >
      <Title size="lg" withBackground>
        Agenda
      </Title>

      <Box
        margin="2rem 0"
        gap="1rem"
        display="grid"
        gridTemplateColumns="1fr 2fr"
        style={{
          gridTemplateRows: "1fr",
        }}
        width="100%"
      >
        <Calendar
          today={today}
          selectedDay={selectedDay}
          setSelectedDay={(selectedDay) => setSelectedDay(selectedDay)}
        />

        <DailySchedule selectedDay={selectedDay} />
      </Box>
    </Box>
  );
}
