import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import styled from "styled-components";
import { TAppointment, translateAppointmentStatus } from "../../../types";
import { Patient } from "../../../types/user";
import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";
import { AppointmentBadge, PatientImage } from "./styles";

export const Appointment = ({
  appointment,
  patient,
  onClick,
  index,
}: {
  appointment: TAppointment;
  patient: Patient;
  onClick: () => void;
  index: () => number;
}) => {
  return (
    <AppointmentContainer
      backgroundColor="#F6F6F6"
      padding="1rem"
      borderRadius="15px"
      gap="1rem"
      alignItems="center"
      onClick={onClick}
      minWidth="fit-content"
      className="scale-up-tl"
      style={{
        cursor: "pointer",
        animationDelay: `${index() * 0.05}s`,
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
        <Paragraph
          withBackground
          size="sm"
          fontWeight="bold"
          style={{
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          {patient.name.length > 20
            ? patient.name.slice(0, 20) + "..."
            : patient.name}
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
    </AppointmentContainer>
  );
};

const AppointmentContainer = styled(Box)`
  max-width: 100%;
`;
