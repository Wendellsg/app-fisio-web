import styled from "styled-components";
import { ThemeColors } from "../../../theme/colors";

export const SearchInputContainer = styled.div`
  background: #f3f3f3;
  border: 2px solid #9e9e9e;
  border-radius: 10px;
  max-width: 270px;
  height: 45px;
  display: flex;
  padding: 0px 10px;
  align-items: center;

  :focus,
  :hover {
    border: 2px solid ${ThemeColors.primary};
  }
`;
export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  background-color: #f3f3f3;
  padding-left: 10px;
  border: 0px;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #000;

  ::placeholder {
    color: #9e9e9e;
  }
`;
