import styled from "styled-components";

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkGray};
`;

export const ValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;
`;
