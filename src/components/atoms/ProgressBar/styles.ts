import styled from "styled-components";

export const ProgressBarContainer = styled.div<{
  width?: string;
  height?: string;
  borderRadius?: string;
}>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "20px"};
  border-radius: ${(props) => props.borderRadius || "10px"};
  background-color: #ddd;
  position: relative;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{
  progress?: string;
}>`
  width: ${(props) => props.progress || "0%"};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.2s ease-in-out;
`;
