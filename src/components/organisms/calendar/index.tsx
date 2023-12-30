"use client";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
  parse,
} from "date-fns";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppointments } from "../../../hooks/useAppointments";
import { usePatients } from "../../../hooks/usePatients";
import { getAppointments } from "../../../utils/appointments";
import { Day, Meeting, WeekDate } from "./styles";
import { Button } from "@/components/ui/button";

const Calendar = ({
  selectedDay,
  setSelectedDay,
  today,
}: {
  selectedDay: Date;
  setSelectedDay: (day: Date) => void;
  today: Date;
}) => {
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [showCalendar, setShowCalendar] = useState(true);

  const { Patients } = usePatients();

  const { appointments } = useAppointments();

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className="flex flex-1 h-fit flex-col w-full py-4 px-8 rounded-xl bg-white shadow-md max-w-[90vw] md:max-w-[400px]  ">
      <div
        className="flex w-full justify-center items-center font-bold md:hidden"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {showCalendar ? "Ocultar calendário" : "Mostrar calendário"}
      </div>

      {showCalendar && (
        <>
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full justify-center items-center ">
              <div className="flex w-full justify-between items-center">
                <Button type="button" variant={"ghost"} onClick={previousMonth}>
                  <FaChevronLeft aria-hidden="true" />
                </Button>

                <h2 className="font-bold text-md md:text-lg capitalize whitespace-nowrap">
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
                </h2>
                <Button type="button" variant={"ghost"} onClick={nextMonth}>
                  <FaChevronRight aria-hidden="true" />
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-4 w-full justify-center my-4">
                <WeekDate isToday={isSunday(today)}>Dom</WeekDate>
                <WeekDate isToday={isMonday(today)}>Seg</WeekDate>
                <WeekDate isToday={isTuesday(today)}>Ter</WeekDate>
                <WeekDate isToday={isWednesday(today)}>Qua</WeekDate>
                <WeekDate isToday={isThursday(today)}>Qui</WeekDate>
                <WeekDate isToday={isFriday(today)}>Sex</WeekDate>
                <WeekDate isToday={isSaturday(today)}>Sab</WeekDate>
              </div>
              <div className="grid grid-cols-7 gap-2 w-full my-8">
                {days.map((day, dayIdx) => (
                  <Day
                    key={day.toString()}
                    style={{
                      gridColumnStart:
                        dayIdx === 0 ? getDay(day) + 1 : undefined,
                    }}
                    isSelected={
                      format(day, "yyyy-MM-dd") ===
                      format(selectedDay, "yyyy-MM-dd")
                    }
                    isCurrentMonth={
                      format(day, "yyyy-MM") ===
                      format(firstDayCurrentMonth, "yyyy-MM")
                    }
                    isToday={
                      format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                    }
                    onClick={() => {
                      setSelectedDay(day);
                    }}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>

                    <div>
                      {getAppointments(day, appointments)
                        ?.slice(0, 2)
                        .map((appointment, meetIndex) => (
                          <Meeting
                            key={appointment._id}
                            style={{
                              left: meetIndex === 0 ? 0 : meetIndex + 12,
                            }}
                          >
                            <img
                              src={
                                Patients?.find(
                                  (patient) =>
                                    patient._id === appointment.patientId
                                )?.image ||
                                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                              }
                              alt=""
                              className="w-full h-auto aspect-square border-accent border object-cover rounded-full "
                            />
                          </Meeting>
                        ))}

                      {getAppointments(day, appointments).length > 1 && (
                        <Meeting
                          style={{
                            left: 24,
                          }}
                        >
                          <span className="text-xs">
                            +{getAppointments(day, appointments).length - 2}
                          </span>
                        </Meeting>
                      )}
                    </div>
                  </Day>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
Calendar.displayName = "Calendar";
export default Calendar;
