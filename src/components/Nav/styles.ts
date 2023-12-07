import styled from "styled-components";
import { Box } from "../atoms/layouts";

export const NavContainer = styled(Box)`
  background: var(--primary-color);
  box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.25);
  z-index: 10;
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 60px;
  min-height: 60px;
  border-radius: 10px 10px 0px 0px;
  display: flex;

  flex-direction: row;

  @media (min-width: 980px) {
    width: 174px;
    min-width: 174px;
    height: 100%;
    border-radius: 18px;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    position: unset;
  }

  ul {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 50%;
    list-style-type: none;
    padding: 0px;
    width: 100%;

    @media (min-width: 980px) {
      flex-direction: column;
    }
  }
`;

export const NavItem = styled.li<{
  active?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.active &&
    `
    background: #fff;
    border-radius: 50%;
    `}

  border-radius: 50%;
  cursor: pointer;
  transition: 300ms;

  width: 40px;
  height: 40px;

  img {
    height: 65%;
    width: 65%;
  }

  @media (min-width: 980px) {
    width: 50px;
    height: 50px;
  }

  &:hover {
    transition: 300ms;
    transform: scale(1.2);
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

export const LogoContainer = styled(Box)`
  display: none;

  @media (min-width: 980px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const SuporteButton = styled(Box)`
  display: none;

  @media (min-width: 980px) {
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
  }
`;
