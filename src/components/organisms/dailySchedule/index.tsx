import { format } from "date-fns";
import { usePatients } from "../../../hooks/usePatients";
import { appointments } from "../../../mock/Paciente";
import {
  getAppointments,
  getAppointmentsByHour,
} from "../../../utils/appointments";
import { Box } from "../../atoms/layouts";
import { Paragraph, Title } from "../../atoms/typograph";
import { Appointment } from "../appointment";

export const DailySchedule = ({ selectedDay }) => {
  const { Patients } = usePatients();

  const appointmentsOfDay = getAppointments(selectedDay, appointments);

  const appointmentsByHour = getAppointmentsByHour(appointmentsOfDay);

  const hours = Object.keys(appointmentsByHour);

  return (
    <Box flexDirection="column" padding="0 1rem" maxHeight="100%">
      <Title size="xl">{format(selectedDay, "dd 'de' MMMM 'de' yyyy")}</Title>

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
