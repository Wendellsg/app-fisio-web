import styled from "styled-components";

export const IconWrapper = styled.div<{
  clickable?: boolean;
}>`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease-in-out;
  ${({ clickable }) =>
    clickable &&
    `
    cursor: pointer;
    &:hover {
        scale: 1.2;
    }
    `}
`;
