import styled from "styled-components";
import { AppointmentStatus } from "../../../types";

export const PatientImage = styled.div`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-color: #fff;
  padding: 3px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const AppointmentBadge = styled.div<{
  status: AppointmentStatus;
}>`
  width: fit-content;
  border-radius: 10px;
  padding: 2px 5px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background-color: ${({ theme, status }) => {
    switch (status) {
      case AppointmentStatus.Scheduled:
        return theme.colors.sky;
      case AppointmentStatus.Done:
        return theme.colors.success;
      case AppointmentStatus.Canceled:
        return theme.colors.danger;
      default:
        return theme.colors.sky;
    }
  }};
  color: ${({ theme }) => theme.colors.white};
`;
