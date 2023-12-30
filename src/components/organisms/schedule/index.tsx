"use client";

import { Modals } from "@/components/molecules/modals";
import { Button } from "@/components/ui/button";
import { TAppointment } from "@/types";
import { startOfToday } from "date-fns";
import { useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { AppointmentForm } from "../appointmentForm";

export const Schedule = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedAppointment, setSelectedAppointment] =
    useState<TAppointment | null>(null);

  const calendarRef = useRef(null);

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
      <div className="w-full flex flex-wrap justify-end items-center gap-4 min-h-fit">
        <div>
          <Button
            variant="default"
            onClick={() => setSelectedAppointment({} as TAppointment)}
          >
            <BsPlus className="text-2xl font-bold"/>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-[max-content max-content] md:grid-cols-[1fr 2fr] gap-4 w-full my-8">
        {/*    <Calendar
        today={today}
        selectedDay={selectedDay}
        setSelectedDay={(selectedDay) => setSelectedDay(selectedDay)}
        ref={calendarRef}
      />

      <DailySchedule selectedDay={selectedDay} calendarRef={calendarRef} /> */}
      </div>
    </>
  );
};
