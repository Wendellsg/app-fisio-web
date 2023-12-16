import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useState } from "react";
import styled from "styled-components";
import { useAppointments } from "../../../hooks/useAppointments";
import { usePatients } from "../../../hooks/usePatients";
import { TAppointment } from "../../../types";
import {
  getAppointments,
  getAppointmentsByHour,
} from "../../../utils/appointments";
import { Box } from "../../atoms/layouts";
import { Paragraph, Title } from "../../atoms/typograph";
import { Modals } from "../../molecules/modals";
import { Appointment } from "../appointment";
import { AppointmentForm } from "../appointmentForm";

export const DailySchedule = ({
  selectedDay,
  calendarRef,
}: {
  selectedDay: Date;
  calendarRef: React.RefObject<HTMLDivElement>;
}) => {
  const { Patients } = usePatients();
  const [selectedAppointment, setSelectedAppointment] =
    useState<TAppointment | null>(null);

  const { appointments } = useAppointments();

  const appointmentsOfDay = getAppointments(selectedDay, appointments || []);

  const appointmentsByHour = getAppointmentsByHour(appointmentsOfDay);

  const hours = Object.keys(appointmentsByHour);

  return (
    <DailyScheduleContainer
      flexDirection="column"
      padding="0 1rem"
      maxHeight={
        calendarRef.current?.getBoundingClientRect().height + "px" ||
        "fit-content"
      }
    >
      <DailyScheduleTitle size="xl">
        {format(selectedDay, "dd 'de' MMMM 'de' yyyy")}
      </DailyScheduleTitle>

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
        flexDirection="column"
        gap="0.5rem"
        margin="1rem 0 0 0"
        style={{
          overflowY: "auto",
        }}
        showScrollBar
        width="100%"
      >
        {hours.map((hour) => {
          return (
            <Box
              key={hour}
              flexDirection="column"
              gap="1rem"
              minHeight="fit-content"
              className="grow-from-left-top"
            >
              <Paragraph
                size="lg"
                fontWeight="bold"
                style={{
                  color: "#999999",
                }}
              >
                {format(
                  utcToZonedTime(
                    parseISO(
                      new Date().toISOString().split("T")[0] + "T" + hour
                    ),
                    "Etc/UTC"
                  ),
                  "HH:mm"
                )}{" "}
              </Paragraph>

              <Box
                flexDirection="column"
                gap="1rem"
                style={{
                  paddingLeft: "1rem",
                }}
              >
                {appointmentsByHour[hour].map((appointment) => {
                  const patient = Patients?.find(
                    (patient) => patient._id === appointment.patientId
                  );

                  if (!patient) return null;

                  return (
                    <Appointment
                      appointment={appointment}
                      patient={patient}
                      index={() => {
                        const index = appointmentsOfDay.findIndex(
                          (appointmentOfDay) =>
                            appointmentOfDay._id === appointment._id
                        );
                        return appointmentsOfDay.length - index;
                      }}
                      key={appointment._id}
                      onClick={() => setSelectedAppointment(appointment)}
                    />
                  );
                })}
              </Box>
            </Box>
          );
        })}

        {hours.length === 0 && (
          <Box
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Paragraph size="sm" fontWeight="bold">
              Nenhum agendamento para este dia
            </Paragraph>
          </Box>
        )}
      </Box>
    </DailyScheduleContainer>
  );
};

const DailyScheduleContainer = styled(Box)<{
  maxHeight?: string;
}>`
  padding-bottom: 1rem;
  max-height: none;
  @media (min-width: 968px) {
    max-height: ${({ maxHeight }) => maxHeight || "100%"};
    overflow-y: auto;
    padding-bottom: 0;
  }
`;

const DailyScheduleTitle = styled(Title)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  white-space: nowrap;
  text-transform: capitalize;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;
