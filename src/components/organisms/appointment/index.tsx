import { format } from "date-fns";
import { TAppointment } from "../../../types";
import { Patient } from "../../../types/user";
import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";
import { PatientImage } from "./styles";

export const Appointment = ({
  appointment,
  patient,
}: {
  appointment: TAppointment;
  patient: Patient;
}) => {
  return (
    <Box
      backgroundColor="#F6F6F6"
      padding="1rem"
      borderRadius="15px"
      gap="1rem"
      alignItems="center"
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
          {format(new Date(appointment.startDate), "HH:mm")} -
          {format(new Date(appointment.endDate), "HH:mm")}
        </Paragraph>
      </Box>
    </Box>
  );
};
