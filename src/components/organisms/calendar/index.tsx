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
import { THEME } from "../../../theme";
import { getAppointments } from "../../../utils/appointments";
import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";
import { ChevronButton, Day, Meeting, WeekDate } from "./styles";

export const Calendar = ({
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
    <Box
      width="500px"
      backgroundColor={THEME.colors.gray}
      padding="2rem"
      borderRadius="20px"
      flexDirection="column"
      maxHeight="fit-content"
    >
      <Box flexDirection="column" width="100%">
        <Box
          flexDirection="column"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%" justifyContent="space-between" alignItems="center">
            <ChevronButton type="button" onClick={previousMonth}>
              <FaChevronLeft aria-hidden="true" />
            </ChevronButton>

            <Paragraph size="lg" fontWeight="bold">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </Paragraph>
            <ChevronButton onClick={nextMonth} type="button">
              <FaChevronRight aria-hidden="true" />
            </ChevronButton>
          </Box>
          <Box
            display="grid"
            width="100%"
            gridTemplateColumns="repeat(7, 1fr)"
            margin="2rem 0"
            justifyContent="center"
            gap="1rem"
          >
            <WeekDate isToday={isSunday(today)}>Dom</WeekDate>
            <WeekDate isToday={isMonday(today)}>Seg</WeekDate>
            <WeekDate isToday={isTuesday(today)}>Ter</WeekDate>
            <WeekDate isToday={isWednesday(today)}>Qua</WeekDate>
            <WeekDate isToday={isThursday(today)}>Qui</WeekDate>
            <WeekDate isToday={isFriday(today)}>Sex</WeekDate>
            <WeekDate isToday={isSaturday(today)}>Sab</WeekDate>
          </Box>
          <Box
            display="grid"
            width="100%"
            gridTemplateColumns="repeat(7, 1fr)"
            margin="2rem 0"
            gap="1rem"
          >
            {days.map((day, dayIdx) => (
              <Day
                key={day.toString()}
                style={{
                  gridColumnStart: dayIdx === 0 ? getDay(day) + 1 : undefined,
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

                <Box>
                  {getAppointments(day, appointments)
                    ?.slice(0, 2)
                    .map((appointment, meetIndex) => (
                      <Meeting
                        key={appointment._id}
                        onClick={() => {}}
                        style={{
                          left: meetIndex === 0 ? 0 : meetIndex + 12,
                        }}
                      >
                        <img
                          src={
                            Patients?.find(
                              (patient) => patient._id === appointment.patientId
                            )?.image ||
                            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                          }
                          alt=""
                          width={"100%"}
                          style={{
                            borderRadius: "50%",
                          }}
                        />
                      </Meeting>
                    ))}

                  {getAppointments(day, appointments).length > 1 && (
                    <Meeting
                      style={{
                        left: 24,
                      }}
                    >
                      <span>
                        +{getAppointments(day, appointments).length - 2}
                      </span>
                    </Meeting>
                  )}
                </Box>
              </Day>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
