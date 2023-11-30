import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { useAppointments } from "../../../hooks/useAppointments";
import { usePatients } from "../../../hooks/usePatients";
import {
  AppointmentComment,
  AppointmentStatus,
  TAppointment,
  translateAppointmentStatus,
} from "../../../types";
import PacienteAvatar from "../../PacienteAvatar";
import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";
import { DefaultButton } from "../../molecules/Buttons";
import { Select } from "../../molecules/Select";
import { TextArea } from "../../molecules/forms";

type AppointmentFormProps = {
  appointment: TAppointment | null;
  onSubmit: () => void;
  onCancel: () => void;
};

const AppointmentStatusOptions = Object.keys(AppointmentStatus).map((key) => ({
  value: key,
  label: translateAppointmentStatus(AppointmentStatus[key]),
}));

export const AppointmentForm = ({
  appointment,
  onSubmit,
  onCancel,
}: AppointmentFormProps) => {
  const { Patients } = usePatients();
  const [newComment, setNewComment] = useState("");

  const { createAppointment, updateAppointment } = useAppointments();

  const [selectedPatient, setSelectedPatient] = useState(
    appointment?.patientId
  );

  const [selectedDate, setSelectedDate] = useState(
    appointment?.startDate ||
      new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
  );

  const [selectedEndDate, setSelectedEndDate] = useState(
    appointment?.endDate ||
      new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
  );

  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus>(
    appointment?.status || AppointmentStatus.Scheduled
  );

  const [comments, setComments] = useState(
    appointment?.comments || ([] as AppointmentComment[])
  );

  const patient = Patients?.find((patient) => patient._id === selectedPatient);

  const handleSubmit = () => {
    const appointmentData = {
      patientId: selectedPatient,
      startDate: selectedDate as string,
      endDate: selectedEndDate as string,
      status: selectedStatus,
      comments,
    };

    if (appointment._id) {
      updateAppointment(appointment._id, appointmentData);
    } else {
      createAppointment(appointmentData);
    }

    onSubmit();
  };

  return (
    <Box
      width="100%"
      height="100%"
      minWidth="500px"
      alignItems="flex-start"
      justifyContent="flex-start"
      padding="2rem"
      flexDirection="column"
      gap="1rem"
    >
      {patient ? (
        <Box width="100%" flexDirection="column" gap="1rem">
          <Paragraph fontWeight="bold">Paciente</Paragraph>

          <PacienteAvatar
            image={patient.image}
            name={patient.name}
            index={1}
            id={patient._id}
            onClick={() => setSelectedPatient(null)}
          />
        </Box>
      ) : (
        <Box flexDirection="column" gap="1rem">
          <Paragraph fontWeight="bold">Selecione um paciente</Paragraph>
          <Box gap="1rem" flexWrap="wrap">
            {Patients.slice(0, 10).map((patient, index) => {
              return (
                <PacienteAvatar
                  key={patient._id}
                  image={patient.image}
                  name={patient.name}
                  index={index}
                  id={patient._id}
                  onClick={() => setSelectedPatient(patient._id)}
                />
              );
            })}
          </Box>
        </Box>
      )}

      {patient && (
        <Box flexDirection="column" gap="1rem">
          <Paragraph fontWeight="bold">Data</Paragraph>
          <input
            type="date"
            value={new Date(selectedDate).toISOString().split("T")[0]}
            className="picker"
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
        </Box>
      )}

      {patient && selectedDate && (
        <Box flexDirection="column" gap="1rem">
          <Paragraph fontWeight="bold">Horário</Paragraph>

          <Box gap="1rem" alignItems="center">
            <input
              type="time"
              value={new Date(selectedDate)
                .toISOString()
                .split("T")[1]
                .split(".")[0]
                .slice(0, 5)}
              className="picker"
              onChange={(e) =>
                setSelectedDate(
                  new Date(
                    new Date(
                      `${new Date(selectedDate).toISOString().split("T")[0]}T${
                        e.target.value
                      }`
                    ).getTime() -
                      new Date().getTimezoneOffset() * 60000
                  )
                )
              }
            />
            <Paragraph size="sm" fontWeight="bold">
              até as
            </Paragraph>

            <input
              type="time"
              value={new Date(selectedEndDate)
                .toISOString()
                .split("T")[1]
                .split(".")[0]
                .slice(0, 5)}
              className="picker"
              onChange={(e) =>
                setSelectedEndDate(
                  new Date(
                    new Date(
                      `${new Date(selectedDate).toISOString().split("T")[0]}T${
                        e.target.value
                      }`
                    ).getTime() -
                      new Date().getTimezoneOffset() * 60000
                  )
                )
              }
            />
          </Box>
        </Box>
      )}

      {patient && selectedDate && selectedEndDate && (
        <Box flexDirection="column" gap="1rem" width="100%" maxWidth="200px">
          <Select
            label="Status"
            width="100%"
            maxWidth="200px"
            value={
              AppointmentStatusOptions.find(
                (option) => option.value === selectedStatus
              ) || AppointmentStatusOptions[0]
            }
            onChange={(option) =>
              setSelectedStatus(
                AppointmentStatus[option.value as AppointmentStatus]
              )
            }
            options={AppointmentStatusOptions}
          />
        </Box>
      )}

      {patient && (
        <Box flexDirection="column" width="100%" gap="1rem">
          <TextArea
            label="Comentário"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Novo comentário"
          />

          <Box width="100%" justifyContent="flex-end" gap="1rem">
            <DefaultButton
              onClick={() => {
                if (newComment) {
                  setComments([
                    ...comments,
                    {
                      _id: uuid(),
                      comment: newComment,
                      createdAt: new Date().toDateString(),
                    },
                  ]);
                  setNewComment("");
                }
              }}
              text="Adicionar comentário"
              type="submit"
              width="200px"
            />
          </Box>
          <Paragraph fontWeight="bold">Comentários</Paragraph>

          {comments?.length === 0 && (
            <Paragraph size="xs">Nenhum comentário </Paragraph>
          )}
          {comments?.map((comment) => (
            <Box
              flexDirection="column"
              width="100%"
              gap="10px "
              key={comment._id}
              margin="0 0 1rem 1rem"
              style={{
                borderBottom: "1px solid #ccc",
              }}
            >
              <Box
                width="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Paragraph size="xs" fontWeight="bold">
                  {new Date(comment.createdAt).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Paragraph>

                <FaTrash
                  cursor={"pointer"}
                  onClickCapture={() => {
                    setComments(comments.filter((c) => c._id !== comment._id));
                  }}
                />
              </Box>
              <Paragraph>{comment.comment}</Paragraph>
            </Box>
          ))}
        </Box>
      )}

      <Box width="100%" justifyContent="center" gap="1rem" margin="2rem 0 0 0">
        {appointment._id && (
          <DefaultButton
            onClick={() => {
              onSubmit();
              onCancel();
            }}
            text="Deletar"
            type="negation"
            width="200px"
          />
        )}
        <DefaultButton
          onClick={handleSubmit}
          text="Salvar"
          type="submit"
          width="200px"
        />
      </Box>
    </Box>
  );
};
