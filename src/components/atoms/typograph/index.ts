import styled from "styled-components";

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
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: ${({ size }) => size || TextSizes.mobile.large};
  }
  @media (max-width: 425px) {
    font-size: ${({ size }) => size || TextSizes.mobile.medium};
  }
`;

export const Title = styled.h1<{
  color?: "white" | "primary" | "black";
  align?: "center" | "left" | "right";
  maxWidth?: string;
  size?: "md" | "lg" | "xl" | "xxl";
  variant?: "primary" | "secondary";
  uppercase?: boolean;
  fontWeight?: "normal" | "bold";
  withBackground?: boolean;
}>`
  font-size: ${({ theme, size }) => theme.fontSizes[size || "lg"]};
  line-height: ${({ theme, size }) => theme.lineHeights[size || "md"]};
  font-family: ${({ theme, variant }) => theme.fonts[variant || "primary"]};
  font-weight: ${({ theme, fontWeight }) =>
    theme.fontWeights[fontWeight || "bold"]};
  color: ${({ theme, color }) => theme.colors[color || "black"]};
  max-width: ${({ maxWidth }) => maxWidth || "100%"};
  text-align: ${({ align }) => align || "left"};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "none")};
  margin: 0;

  ${({ withBackground, theme }) =>
    withBackground &&
    `
    background: ${theme.colors.primary} ;
    padding: 5px 10px;
    border-radius: 10px;

  `}
`;

export const Paragraph = styled.p<{
  color?: "white" | "primary" | "black" | string;
  align?: "center" | "left" | "right" | "justify";
  maxWidth?: string;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  fontWeight?: "regular" | "bold";
  uppercase?: boolean;
}>`
  font-size: ${({ theme, size }) => theme.fontSizes[size || "md"]};
  line-height: ${({ theme, size }) => theme.lineHeights[size || "md"]};
  font-family: ${({ theme, variant }) => theme.fonts[variant || "primary"]};
  font-weight: ${({ theme, fontWeight }) =>
    theme.fontWeights[fontWeight || "regular"]};
  color: ${({ theme, color }) => theme.colors[color || "black"]};
  max-width: ${({ maxWidth }) => maxWidth || "100%"};
  text-align: ${({ align }) => align || "left"};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "none")};
  margin: 0;
`;
