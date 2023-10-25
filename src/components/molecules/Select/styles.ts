import styled from "styled-components";

export const SelectContainer = styled.div<{
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  margin?: string;
}>`
  width: ${(props) => props.width || "100%"};
  min-width: ${(props) => props.minWidth || "100%"};
  max-width: ${(props) => props.maxWidth || "100%"};

  min-height: ${(props) => props.minHeight || "65px"};
  margin: ${(props) => props.margin || "0px"};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const Select = styled.div<{
  height?: string;
  opened?: boolean;
  width?: string;
}>`
  position: absolute;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "40px"};
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  flex-direction: column;
  border-radius: 15px;
  outline-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid #999;
  cursor: pointer;
  background-color: #fff;

  :hover {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  ${(props) =>
    props.opened &&
    `
    border: 2px solid ${({ theme }) => theme.colors.primary};
    `}

  z-index: ${(props) => (props.opened ? "100" : "0")};
`;

export const Option = styled.div<{
  isLabel?: boolean;
  height?: string;
  selected?: boolean;
  opened?: boolean;
}>`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  padding: 5px 10px;
  height: ${(props) => props.height || "fit-content"};
  width: 100%;
  border-bottom: ${(props) =>
    props.selected || !props.opened
      ? "none"
      : props.isLabel
      ? "1px solid #DDD"
      : "1px solid #999"};
  margin-bottom: ${(props) => (props.isLabel ? "5px" : "0px")};
  text-align: left;
  ${(props) =>
    props.isLabel &&
    `
    color: #999;
    `}
  &:hover {
    background: ${(props) =>
      props.isLabel ? "transparent" : props.theme.colors.primary};
  }
  color: ${(props) => (props.isLabel && !props.selected ? "#d9d9d9" : "#000")};
`;
