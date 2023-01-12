import styled from "styled-components";

export const CenteredRow = styled.div<{
  height?: string;
  width?: string;
  justifyContent?: string;
  gap?: string;
  alignItems?: string;
  wrap?: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  height: ${(props) => props.height || "100%"};
  width: ${(props) => props.width || "100%"};
  gap: ${(props) => props.gap || "0"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
`;

export const CenteredColumn = styled.div<{
  height?: string;
  width?: string;
  justifyContent?: string;
  gap?: string;
  alignItems?: string;
  wrap?: string;
  flex?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  height: ${(props) => props.height || "100%"};
  width: ${(props) => props.width || "100%"};
  gap: ${(props) => props.gap || "0"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  flex: ${(props) => props.flex || "1"};
`;

export const PageContainer = styled.div<{}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 50px;
  gap: 2rem;
  padding-bottom: 2rem;

  @media screen and (max-width: 800px) {
    padding: 2rem;
  }
`;

export const ContentContainer = styled.div<{}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  gap: 3rem;
  max-width: 1100px;
  @media screen and (max-width: 800px) {
    padding: 0 1rem;
  }
`;

export const HorizontalList = styled.div<{
  gap?: string;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  flex-wrap: wrap;
  align-items: ${(props) => props.alignItems || "center"};
  gap: ${(props) => props.gap || "1rem"};
  width: ${(props) => props.width || "100%"};

  @media screen and (max-width: 425px) {
    justify-content: center;
  }
`;

export const VerticalList = styled.div<{
  gap?: string;
  justifyContent?: string;
  alignItems?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  flex-wrap: wrap;
  align-items: ${(props) => props.alignItems || "center"};
  gap: ${(props) => props.gap || "1rem"};
  width: 100%;

  @media screen and (max-width: 425px) {
    justify-content: center;
  }
`;
