import styled from "styled-components";
import { ThemeColors } from "../../../theme/colors";
import { TextSizes } from "../../../theme/sizing";
import { ThemeFonts } from "../../../theme/typograph";

const switchType = (type: string) => {
  switch (type) {
    case "confirmation":
      return ThemeColors.primary;
    case "negation":
      return ThemeColors.danger;
    case "disabled":
      return ThemeColors.grey;
    case "neutral":
      return ThemeColors.sky;
    default:
      return ThemeColors.primary;
  }
};

export const Button = styled.div<{
  width?: string;
  height?: string;
  maxWidth?: string;
  minWidth?: string;
  type: "confirmation" | "negation" | "disabled" | "neutral" | undefined;
}>`
  padding: 5px 10px;
  gap: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: ${TextSizes.desktop.medium};
  font-family: ${ThemeFonts.primary};
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
    transform: scale(1.1);
  }
`;
