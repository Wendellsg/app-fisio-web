import { startOfToday } from "date-fns";
import { useState } from "react";
import { AddButton } from "../../src/components/atoms/Buttons";
import { Box } from "../../src/components/atoms/layouts";
import { Title } from "../../src/components/atoms/typograph";
import { Modals } from "../../src/components/molecules/modals";
import { AppointmentForm } from "../../src/components/organisms/appointmentForm";
import { Calendar } from "../../src/components/organisms/calendar";
import { DailySchedule } from "../../src/components/organisms/dailySchedule";
import { TAppointment } from "../../src/types";

export default function SchedulePage() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedAppointment, setSelectedAppointment] =
    useState<TAppointment | null>(null);

  return (
    <Box
      width="100%"
      justifyContent="space-between"
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

      <Modals
        isOpen={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        title="Adicionar Agendamento"
      >
        <AppointmentForm
          appointment={selectedAppointment}
          onCancel={() => setSelectedAppointment(null)}
          onSubmit={() => setSelectedAppointment(null)}
        />
      </Modals>

      <Box
        width="100%"
        alignItems="center"
        justifyContent="flex-end"
        flexWrap="wrap"
        gap="1rem"
      >
        <Box>
          <AddButton
            onClick={() => setSelectedAppointment({} as TAppointment)}
          />
        </Box>
      </Box>

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
