import styled from "styled-components";

export const ProfileContainer = styled.div`
  padding: 5rem;
  display: flex;
  justify-content: space-between;
  min-height: 835px;

  @media (max-width: 700px) {
    flex-direction: column-reverse;
    justify-content: center;
    padding: 3rem;
    max-width: 100vw;
  }

  @media (max-width: 425px) {
    padding: 2rem;
  }
`;

export const ProfileFirstColumn = styled.div`
  max-width: 70%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (max-width: 700px) {
    justify-content: center;
    max-width: 100%;
    margin: 0 auto;
  }
`;

export const ProfileSecundColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
`;

export const ProfileImageBorder = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 95%;
    height: 95%;
    border-radius: 50%;
    border: 4px solid #fff;
  }

  @media (max-width: 700px) {
    margin: 0 auto;
    height: 150px;
    width: 150px;
  }
`;

export const ProfileName = styled.h1`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 65px;
  color: #000000;
  margin-bottom: 20px;

  @media (max-width: 700px) {
    font-size: 30px;
    text-align: center;
  }
`;

export const FisioInfo = styled.div`
  display: flex;
  align-items: center;
  & > h2,
  h3 {
    margin-right: 10px;
    margin-bottom: 10px;
    font-family: "Nunito";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #000000;
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const ProfileResume = styled.div`
  margin-top: 40px;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  text-align: justify;
  color: #000000;
`;

export const ProfileContact = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;

  & > span {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 25px;
    text-align: left;
    color: #000000;
    margin-left: 10px;

    @media (max-width: 700px) {
      font-size: 15px;
    }
  }

  @media (max-width: 700px) {
    margin-top: 10px;
  }
`;

export const ProfileContactIcon = styled.div`
  min-width: 53px;
  @media (max-width: 700px) {
    max-width: 30px;
    min-width: 30px;
  }
`;

export const EditPerfilButton = styled.button`
  transition: 300ms;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  text-align: justify;
  color: #000000;
  margin-left: 10px;
  border: none;

  &:hover {
    transition: 300ms;
    transform: scale(1.1);
  }

  & > p {
    margin-right: 10px;

    @media (max-width: 700px) {
      display: none;
    }
  }

  @media (max-width: 700px) {
    position: relative;
    top: -160px;
    right: -90px;
  }
`;

export const EditPerfilButtonIcon = styled.div`
  border-radius: 10px;
  padding: 5px;
  background-color: var(--primary-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
