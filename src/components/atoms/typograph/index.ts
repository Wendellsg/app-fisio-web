import styled from "styled-components";
import { ThemeColors } from "../../../theme/colors";
import { TextSizes } from "../../../theme/sizing";

export const HilightedText = styled.span<{
  size?: string;
  width?: string;
}>`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: ${({ size }) => TextSizes.desktop[size || "medium"]};
  width: ${({ width }) => width || "auto"};
  padding: 7px 20px;
  background: ${ThemeColors.primary};
  border-radius: 10px;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: ${({ size }) => TextSizes.mobile[size || "medium"]};
  }
`;
