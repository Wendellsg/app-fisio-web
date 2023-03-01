import styled from "styled-components";
import { ThemeColors } from "../../../theme/colors";

export const Label = styled.label<{
  width?: string;
}>`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #000000;
  margin-bottom: 20px;
  width: ${(props) => props.width || "fit-content"};
  white-space: nowrap;
`;

export const Input = styled.input<{
  width?: string;
  height?: string;
  maxWidth?: string;
  minWidth?: string;
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
    border: 2px solid ${ThemeColors.primary};
  }

  &:hover {
    border: 2px solid ${ThemeColors.primary};
  }
`;

export const Select = styled.select`
  margin-right: 20px;
  width: 70px;
  height: 35px;
  background: ${ThemeColors.primary};
  border-radius: 10px;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
  border: 0px;
  padding: 3px 7px;
  outline-color: ${ThemeColors.primary};
`;

export const TextArea = styled.textarea<{
  width?: string;
  height?: string;
  maxWidth?: string;
  minWidth?: string;
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

  &:focus {
    border: 2px solid ${ThemeColors.primary};
  }

  &:hover {
    border: 2px solid ${ThemeColors.primary};
  }
`;
