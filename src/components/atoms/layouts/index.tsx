import styled from "styled-components";

export const AppContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: #fff;
  height: 90vh;
  margin-top: 50px;
  border-radius: 18px;
  box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  @media (max-width: 980px) {
    width: 100%;
    margin-top: 0px;
    border-radius: 0px;
    height: calc(100vh - 40px);
  }
`;

export const Box = styled.div<{
  display?: "flex" | "block" | "inline-block" | "inline" | "none";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  padding?: string;
  margin?: string;
  gap?: string;
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  overflow?: "visible" | "hidden" | "scroll" | "auto";
}>`
  display: ${({ display }) => display || "flex"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  align-items: ${({ alignItems }) => alignItems || "flex-start"};
  flex-wrap: ${({ flexWrap }) => flexWrap || "nowrap"};
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  max-width: ${({ maxWidth }) => maxWidth || "none"};
  max-height: ${({ maxHeight }) => maxHeight || "none"};
  min-width: ${({ minWidth }) => minWidth || "0"};
  min-height: ${({ minHeight }) => minHeight || "0"};
  padding: ${({ padding }) => padding || "0"};
  margin: ${({ margin }) => margin || "0"};
  gap: ${({ gap }) => gap || "0"};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "transparent"};
  border-radius: ${({ borderRadius }) => borderRadius || "0"};
  box-shadow: ${({ boxShadow }) => boxShadow || "none"};
  overflow-y: ${({ overflow }) => overflow || "visible"};
  box-sizing: border-box;
`;

export const BackGroundImage = styled.div<{
  imgSrc?: string;
  backgroundSize?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  blur?: string;
}>`
  background-image: ${({ imgSrc }) => `url(${imgSrc})`};
  background-size: ${({ backgroundSize }) => backgroundSize || "cover"};
  background-position: center;
  background-repeat: no-repeat;
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  max-width: ${({ maxWidth }) => maxWidth || "none"};
  max-height: ${({ maxHeight }) => maxHeight || "none"};
  min-width: ${({ minWidth }) => minWidth || "0"};
  min-height: ${({ minHeight }) => minHeight || "0"};
  filter: ${({ blur }) => `blur(${blur || "0"})`};
`;

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content:  flex-start;
  width: calc(100% - 174px);
  height: 100%;
  padding: 50px;
  margin-left: 174px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 80px;
    padding: 10px;
  }
`;
