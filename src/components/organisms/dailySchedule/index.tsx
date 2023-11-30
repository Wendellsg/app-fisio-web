import { format } from "date-fns";
import { useState } from "react";
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

export const DailySchedule = ({ selectedDay }) => {
  const { Patients } = usePatients();
  const [selectedAppointment, setSelectedAppointment] =
    useState<TAppointment | null>(null);

  const { appointments } = useAppointments();

  const appointmentsOfDay = getAppointments(selectedDay, appointments || []);

  const appointmentsByHour = getAppointmentsByHour(appointmentsOfDay);

  const hours = Object.keys(appointmentsByHour);

  return (
    <Box flexDirection="column" padding="0 1rem" maxHeight="100%">
      <Title size="xl">{format(selectedDay, "dd 'de' MMMM 'de' yyyy")}</Title>

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
            >
              <Paragraph
                size="lg"
                fontWeight="bold"
                style={{
                  color: "#999999",
                }}
              >
                {hour}
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
                      key={appointment._id}
                      onClick={() => setSelectedAppointment(appointment)}
                    />
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
