import styled from "styled-components";

export const AddButtonContainer = styled.button`
  margin-left: 10px;
  display: flex;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  width: 55px;
  height: 45px;
  padding: 15px;
  align-items: center;
  justify-content: center;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  color: #000000;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    scale: 1.1;
  }
`;
