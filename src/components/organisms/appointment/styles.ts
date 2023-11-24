import styled from "styled-components";

export const PatientImage = styled.div`
  width: 50px;
  height: 50px;
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
