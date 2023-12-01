import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { TAppointment, translateAppointmentStatus } from "../../../types";
import { Patient } from "../../../types/user";
import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";
import { AppointmentBadge, PatientImage } from "./styles";

export const Appointment = ({
  appointment,
  patient,
  onClick,
}: {
  appointment: TAppointment;
  patient: Patient;
  onClick: () => void;
}) => {
  return (
    <Box
      backgroundColor="#F6F6F6"
      padding="1rem"
      borderRadius="15px"
      gap="1rem"
      alignItems="center"
      onClick={onClick}
      style={{
        cursor: "pointer",
      }}
    >
      <PatientImage>
        <img
          src={
            patient.image ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          alt={patient.name}
        />
      </PatientImage>

      <Box flexDirection="column" gap="0.5rem">
        <Paragraph withBackground size="sm" fontWeight="bold">
          {patient.name}
        </Paragraph>

        <Paragraph
          fontWeight="bold"
          size="sm"
          style={{
            color: "#999999",
          }}
        >
          {format(
            utcToZonedTime(parseISO(appointment.startDate), "Etc/UTC"),
            "HH:mm"
          )}{" "}
          -
          {format(
            utcToZonedTime(parseISO(appointment.endDate), "Etc/UTC"),
            "HH:mm"
          )}
        </Paragraph>

        <AppointmentBadge status={appointment.status}>
          {translateAppointmentStatus(appointment.status)}
        </AppointmentBadge>
      </Box>
    </Box>
  );
};
