import { startOfToday } from "date-fns";
import { useRef, useState } from "react";
import styled from "styled-components";
import { AddButton } from "../../src/components/atoms/Buttons";
import { Box } from "../../src/components/atoms/layouts";
import { Title } from "../../src/components/atoms/typograph";
import { Modals } from "../../src/components/molecules/modals";
import { AppointmentForm } from "../../src/components/organisms/appointmentForm";
import Calendar from "../../src/components/organisms/calendar";
import { DailySchedule } from "../../src/components/organisms/dailySchedule";
import { TAppointment } from "../../src/types";

export default function SchedulePage() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedAppointment, setSelectedAppointment] =
    useState<TAppointment | null>(null);

  const calendarRef = useRef(null);

  return (
    <Box
      width="100%"
      justifyContent="flex-start"
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
        minHeight="fit-content"
      >
        <Box>
          <AddButton
            onClick={() => setSelectedAppointment({} as TAppointment)}
          />
        </Box>
      </Box>

      <ScheduleContent margin="2rem 0" gap="1rem" display="grid" width="100%">
        <Calendar
          today={today}
          selectedDay={selectedDay}
          setSelectedDay={(selectedDay) => setSelectedDay(selectedDay)}
          ref={calendarRef}
        />

        <DailySchedule selectedDay={selectedDay} calendarRef={calendarRef} />
      </ScheduleContent>
    </Box>
  );
}

const ScheduleContent = styled(Box)`
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content;

  @media (min-width: 968px) {
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    margin: 2rem 0;
  }
`;
