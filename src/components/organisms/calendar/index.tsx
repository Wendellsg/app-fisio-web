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
  startOfToday,
} from "date-fns";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { THEME } from "../../../theme";
import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";
import { ChevronButton, Day, Meeting, WeekDate } from "./styles";

const meetings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-11-11T13:00",
    endDatetime: "2023-11-11T14:30",
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-11-20T09:00",
    endDatetime: "2023-11-20T11:30",
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-11-20T17:00",
    endDatetime: "2023-11-20T18:30",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-06-09T13:00",
    endDatetime: "2022-06-09T14:30",
  },
  {
    id: 5,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-11-13T14:00",
    endDatetime: "2023-11-13T14:30",
  },
];

const getMeetings = (day: Date) => {
  const dayString = format(day, "yyyy-MM-dd");
  return meetings.filter(
    (meeting) =>
      format(
        parse(meeting.startDatetime, "yyyy-MM-dd'T'HH:mm", new Date()),
        "yyyy-MM-dd"
      ) === dayString
  );
};

export const Calendar = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

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
                onClick={() => setSelectedDay(day)}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>

                <Box>
                  {getMeetings(day)
                    .slice(0, 2)
                    .map((meeting, meetIndex) => (
                      <Meeting
                        key={meeting.id}
                        onClick={() => {}}
                        style={{
                          left: meetIndex === 0 ? 0 : meetIndex + 12,
                        }}
                      >
                        <img
                          src={meeting.imageUrl}
                          alt=""
                          width={"100%"}
                          style={{
                            borderRadius: "50%",
                          }}
                        />
                      </Meeting>
                    ))}

                  {getMeetings(day).length > 1 && (
                    <Meeting
                      style={{
                        left: 24,
                      }}
                    >
                      <span>+{getMeetings(day).length - 1}</span>
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
