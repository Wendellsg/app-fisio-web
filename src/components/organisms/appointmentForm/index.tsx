"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { useAppointments } from "../../../hooks/useAppointments";
import { usePatients } from "../../../hooks/usePatients";
import {
  Appointment,
  AppointmentComment,
  AppointmentStatus,
  translateAppointmentStatus,
} from "../../../types";
import PacienteAvatar from "../../PacienteAvatar";
import { SearchInput } from "../../molecules/SearchInput";
import { Select } from "../../molecules/Select";

type AppointmentFormProps = {
  appointment: Appointment | null;
  onSubmit: () => void;
  onCancel: () => void;
};

const AppointmentStatusOptions = Object.keys(AppointmentStatus).map((key) => ({
  value: AppointmentStatus[key],
  label: translateAppointmentStatus(AppointmentStatus[key]),
}));

export const AppointmentForm = ({
  appointment,
  onSubmit,
  onCancel,
}: AppointmentFormProps) => {
  const { Patients } = usePatients();
  const [newComment, setNewComment] = useState("");
  const [search, setSearch] = useState("");

  const filteredPatients = useMemo(() => {
    return Patients?.filter((patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, Patients]);

  const { createAppointment, updateAppointment, deleteAppointment } =
    useAppointments();

  const [selectedPatient, setSelectedPatient] = useState(
    appointment?.patient?.id
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

  const patient = Patients?.find((patient) => patient.id === selectedPatient);

  const selectedOption = AppointmentStatusOptions.find(
    (option) => option.value === selectedStatus
  )?.value;

  const handleSubmit = () => {
    const appointmentData = {
      ...appointment,
      patientId: selectedPatient,
      startDate: selectedDate as string,
      endDate: selectedEndDate as string,
      status: selectedStatus,
      comments,
    };

    if (appointment?.id) {
      updateAppointment(appointment.id, appointmentData);
    } else {
      createAppointment(appointmentData);
    }

    onSubmit();
  };

  return (
    <div className=" h-full flex flex-col gap-4 p-8 w-full">
      {patient ? (
        <div className="flex  flex-col justify-start items-start gap-4 max-w-full">
          <p className="font-bold">Paciente</p>

          <PacienteAvatar
            image={patient.image}
            name={patient.name}
            index={1}
            id={patient.id}
            onClick={() => setSelectedPatient(undefined)}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="font-bold">Selecione um paciente</p>

          <SearchInput
            placeholder="Buscar paciente"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-wrap gap-4">
            {filteredPatients?.slice(0, 10).map((patient, index) => {
              return (
                <PacienteAvatar
                  key={patient.id}
                  image={patient.image}
                  name={patient.name}
                  index={index}
                  id={patient.id}
                  onClick={() => setSelectedPatient(patient.id)}
                />
              );
            })}
          </div>
        </div>
      )}

      {patient && (
        <div className="flex flex-col gap-4">
          <p className="font-bold">Data</p>
          <input
            type="date"
            value={new Date(selectedDate).toISOString().split("T")[0]}
            className="picker"
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
        </div>
      )}

      {patient && selectedDate && (
        <div className="flex flex-col gap-4">
          <p className="font-bold">Horário</p>

          <div className="flex items-center gap-4">
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
            <p className="text-sm whitespace-nowrap font-bold">até as</p>

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
          </div>
        </div>
      )}

      {patient && selectedDate && selectedEndDate && (
        <div className="flex flex-col gap-4 w-full max-w-48">
          <Select
            className="w-full max-w-48"
            placeholder="Status"
            value={selectedOption}
            onChange={(value) => setSelectedStatus(value as AppointmentStatus)}
            options={AppointmentStatusOptions}
          />
        </div>
      )}

      {patient && (
        <div className="flex- flex-col w-full gap-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="comment">Comentário</Label>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Novo comentário"
              name="comment"
              id="comment"
            />
          </div>

          <div className="flex w-full justify-end gap-4 mt-4">
            <Button
              onClick={() => {
                if (newComment) {
                  setComments([
                    ...comments,
                    {
                      id: uuid(),
                      comment: newComment,
                      createdAt: new Date(),
                    },
                  ]);
                  setNewComment("");
                }
              }}
              className="w-48"
            >
              Adicionar comentário
            </Button>
          </div>
          <p className="font-bold my-4">Comentários</p>

          {comments?.length === 0 && (
            <p className="text-xs">Nenhum comentário </p>
          )}
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col gap-2 mr-4 mb-4 border-b border-gray-300 pl-4"
            >
              <div className="flex w-full items-center justify-between">
                <p className="text-xs font-bold">
                  {new Date(comment.createdAt).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <FaTrash
                  cursor={"pointer"}
                  onClickCapture={() => {
                    setComments(comments.filter((c) => c.id !== comment.id));
                  }}
                />
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex justify-center gap-4 mt-8">
        {appointment?.id && (
          <Button
            onClick={() => {
              deleteAppointment(appointment.id);
              onCancel();
            }}
            variant="destructive"
            className="w-48"
          >
            Excluir
          </Button>
        )}
        <Button onClick={handleSubmit} type="submit" className="w-48">
          Salvar
        </Button>
      </div>
    </div>
  );
};
