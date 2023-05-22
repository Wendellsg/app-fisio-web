import styled from "styled-components";

export const StyledLabel = styled.label<{
  width?: string;
}>`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 25px;
  margin-left: 10px;
  color: #000000;
  width: ${(props) => props.width || "fit-content"};
  white-space: nowrap;
`;

export const StyledInput = styled.input<{
  width?: string;
  height?: string;
  maxWidth?: string;
  minWidth?: string;
  error: boolean;
}>`
  padding: 5px 10px;
  border-radius: 15px;
  border: 2px solid #999;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #000000;
  outline: none;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "40px"};
  max-width: ${(props) => props.maxWidth || "100%"};
  min-width: ${(props) => props.minWidth || "100%"};

  //Remove arrows from number input
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }

  &:hover {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }

  ${(props) =>
    props.error &&
    `
    border: 2px solid ${props.theme.colors.danger};
  `}
`;

export const StyledSelect = styled.select`
  margin-right: 20px;
  width: 70px;
  height: 35px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
  border: 0px;
  padding: 3px 7px;
  outline-color: ${(props) => props.theme.colors.primary};
`;

export const StyledTextArea = styled.textarea<{
  width?: string;
  height?: string;
  maxWidth?: string;
  minWidth?: string;
  minHeight?: string;
}>`
  padding: 5px 10px;
  border-radius: 15px;
  border: 2px solid #999;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #000000;
  resize: vertical;
  outline: none;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "40px"};
  max-width: ${(props) => props.maxWidth || "100%"};
  min-width: ${(props) => props.minWidth || "100%"};
  min-height: ${(props) => props.minHeight || "40px"};

  &:focus {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }

  &:hover {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }
`;
