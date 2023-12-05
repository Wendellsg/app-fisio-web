import styled from "styled-components";
import { Box } from "../src/components/atoms/layouts";

export const ProfileMenuList = styled(Box)<{
  isMenuOpen: boolean;
}>`
  position: absolute;
  top: 110px;
  left: 50%;
  transform: translateX(-50%);
  ${(props) =>
    props.isMenuOpen ? "transform: translateY(-240px) translateX(-50%);" : ""}
  transition: 500ms;
  list-style-type: none;
  text-align: center;
  overflow: clip;
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileMenuItem = styled(Box)`
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

export const HomeContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
`;

export const HomeLastPacientes = styled.div`
  margin-top: 20px;

  & > h2 {
    margin-left: 15px;
  }
`;

export const HomeContentSection1 = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

export const HomeContentSection2 = styled.div`
  min-width: 250px;
  width: 300px;
  margin-top: 20px;
  text-align: right;
  padding: 20px;

  @media (max-width: 1407px) {
    width: 100%;
  }

  @media (max-width: 980px) {
    display: none;
  }
`;

export const HomeNewsList = styled.div`
  margin-top: 20px;
  height: 350px;
  overflow: scroll;
  overflow-x: hidden;
  padding-right: 20px;

  @media (max-width: 1407px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    overflow: hidden;
  }
  @media (max-width: 893px) {
    padding-bottom: 50px;
    justify-content: center;
  }
`;

export const HomeLastPacientesList = styled.div`
  position: -ms-page;
  padding-top: 25px;
  justify-content: flex-start;
  display: flex;
  margin-left: 50%;
  width: 100%;
  transform: translateX(-50%);
  max-width: 100%;
  overflow-x: auto;
  vertical-align: middle;
  overflow-y: hidden;
  height: 200px;
  padding-left: 10px;
  padding-right: 26px;
  gap: 10px;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1407px) {
    max-width: 100vw;
    scroll-snap-type: x mandatory;
  }
`;

export const HomeNewsTitle = styled.div`
  font-size: 18px;
`;
