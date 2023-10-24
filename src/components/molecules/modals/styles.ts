import styled from "styled-components";
import { RiCloseCircleFill } from "react-icons/ri";

export const Modal = styled.div<{}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 100;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  border-radius: 30px;
  width: fit-content;
  max-width: 90%;
  max-height: 90vh;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalClose = styled(RiCloseCircleFill)`
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  font-size: 2rem;
  margin-left: auto;
`;
