import styled from "styled-components";
import { THEME } from "../../../theme";
import { Box } from "../../atoms/layouts";

export const CalendarContainer = styled(Box)`
  max-width: 90vw;

  @media (min-width: 968px) {
    width: 500px;
  }
`;

export const ShowCalendarSwitcher = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  @media (min-width: 968px) {
    visibility: hidden;
  }
`;

export const WeekDate = styled.span<{
  isToday: boolean;
}>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: ${({ isToday }) => (isToday ? "#FFF" : "#999")};
  background-color: ${({ isToday }) =>
    isToday ? THEME.colors.primary : "transparent"};
  border-radius: 15px;
`;

export const Day = styled.div<{
  isToday: boolean;
  isCurrentMonth: boolean;
  isSelected: boolean;
}>`
  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ isCurrentMonth, isSelected }) =>
    isSelected
      ? "#fff"
      : isCurrentMonth
      ? "#333"
      : isSelected
      ? "#000"
      : "#999"};
  background-color: ${({ isSelected }) =>
    isSelected ? THEME.colors.primary : "transparent"};

  border: ${({ isToday }) =>
    isToday ? `2px solid ${THEME.colors.primary}` : "none"};
  cursor: pointer;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? THEME.colors.primary : "#e5e5e5"};
  }
`;

export const Meeting = styled.div`
  width: 20px;
  height: auto;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -5px;
  left: 0;
  border-radius: 50%;
  color: #fff;
  padding: 1px;
  background-color: ${THEME.colors.primary};
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  span {
    font-size: 10px;
  }
`;

export const ChevronButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  padding: 10px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    color: #999;
  }

  &:hover {
    background-color: #e5e5e5;
  }
`;
