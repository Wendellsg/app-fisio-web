"use client";

import { Modals } from "@/components/molecules/modals";
import { useUserData } from "@/hooks/useUserData";
import { AppointmentForm } from "../appointmentForm";

export const Schedule = () => {
  const { userData } = useUserData();

  return (
    <>
      {
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
      }
    </>
  );
};
