import styled from "styled-components";

export const Container = styled.div`
  overflow-x: hidden;
  @media (min-width: 980px) {
    padding: 50px;
  }
  @media (max-width: 980px) {
    padding: 0px;
  }
  @media (max-width: 425px) {
    padding: 0px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 150px;
  margin-bottom: 20px;
  @media (max-width: 980px) {
    padding: 3rem;
  }
  @media (max-width: 425px) {
    padding: 2rem;
  }
`;

export const ProfileUserName = styled.div`
  & > h1 {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 65px;
    color: #000000;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 980px) {
    display: flex;
    justify-content: center;
    flex-direction: column;

    & > h1 {
      font-size: 35px;
      line-height: 33px;
    }
  }

  @media (max-width: 425px) {
    & > h1 {
      font-size: 23px;
      line-height: 23px;
    }
  }
`;
export const ProfileMenu = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 425px) {
    width: 100px;
  }
`;

export const ProfileImageBorder = styled.div`
  height: 83px;
  width: 83px;
  border: 3px solid var(--primary-color);
  border-radius: 50%;
  filter: drop-shadow(2px 1px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  z-index: 2;
  transition: 300ms;
  &:hover {
    transition: 300ms;
    transform: scale(1.1);
  }
  @media (max-width: 425px) {
    transition: 300ms;
    transform: scale(0.8);
  }
`;

export const ProfileImageBackground = styled.div`
  height: 79px;
  width: 79px;
  border-radius: 50%;
  border: 5px solid #ffffff;
  position: relative;
  top: -1px;
  left: -1px;
  z-index: 2;
`;

export const ProfileImage = styled.img`
  position: relative;
  top: 0;
  left: 0;
  border-radius: 50%;
  border: 2px solid #fff;
`;

export const ProfileMenuList = styled.div`
  & > ul {
    position: relative;
    top: -100px;
    list-style-type: none;
    text-align: center;
    overflow: clip;
    height: 230px;
    border-radius: 50% 50% 0 0;
    width: 150px;
    padding: 5px 10px 5px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > li {
      cursor: pointer;
      margin-bottom: 5px;
      font-family: "Nunito";
      font-style: normal;
      font-weight: 700;
      font-size: 17px;
      line-height: 23px;
      color: #000000;
      text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
      padding: 5px 10px 5px 10px;
      border-radius: 15px;
      width: fit-content;
      &:hover {
        background-color: var(--primary-color);
        filter: drop-shadow(2px 1px 4px rgba(0, 0, 0, 0.25));
      }
    }

    @media (max-width: 425px) {
      & > ul > li {
        margin-bottom: 0px;
        font-size: 14px;
        line-height: 19px;
        padding: 5px;
      }
    }
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

export const HomeContentSection1 = styled.div``;

export const HomeContentSection2 = styled.div`
  min-width: 250px;
  width: 300px;
  margin-top: 20px;
  text-align: right;
  padding: 20px;

  @media (max-width: 1407px) {
    width: 100%;
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
  & > * {
    margin-right: 10px;
  }

  @media (max-width: 1407px) {
    width: 100vw;
  }
`;

export const HomeNewsTitle = styled.div`
  font-size: 18px;
`;
