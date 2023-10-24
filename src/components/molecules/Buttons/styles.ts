import styled from "styled-components";
import { THEME } from "../../../theme";

const switchType = (type: string) => {
  switch (type) {
    case "submit":
      return THEME.colors.primary;
    case "negation":
      return THEME.colors.danger;
    case "disabled":
      return THEME.colors.gray;
    case "neutral":
      return THEME.colors.sky;
    default:
      return THEME.colors.primary;
  }
};

export const Button = styled.div<{
  width?: string;
  height?: string;
  maxWidth?: string;
  minWidth?: string;
  type: "submit" | "negation" | "disabled" | "neutral" | undefined;
}>`
  padding: 5px 10px;
  gap: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "40px"};
  max-width: ${({ maxWidth }) => maxWidth || "auto"};
  min-width: ${({ minWidth }) => minWidth || "auto"};
  border: none;
  background-color: ${({ type }) => switchType(type)};
  cursor: pointer;
  transition: 300ms;
  &:hover {
    transform: scale(1.05);
  }
`;
