import styled from "styled-components";

export const PatientAvatar = styled.div`
  height: 83px;
  width: 83px;
  min-height: 83px;
  min-width: 83px;
  border: 3px solid var(--primary-color);
  border-radius: 50%;
  filter: drop-shadow(2px 1px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PatientAvatarImage = styled.img`
  border-radius: 50%;
  border: 4px solid #fff;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
