import styled from "styled-components";
export const ExerciseCard = styled.div`
  width: 250px;
  min-width: 250px;
  height: 360px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: 0.2s ease-in-out;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 10px;
  position: relative;

  :hover {
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

export const ExerciseCardTools = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: flex-end;
  align-items: flex-start;
  top: 0px;
  right: 0px;
  gap: 10px;
  padding: 10px;
`;

export const ExerciseCardInfos = styled.div`
  transition: 300ms ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100px;
  position: absolute;
  padding: 10px 15px;
  bottom: 0px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  border-radius: 10px;
  overflow: hidden;
  text-overflow: clip;
  cursor: pointer;

  :hover {
    justify-content: center;
    transition: 300ms ease-in;
    height: 90%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 70%);
  }
`;

export const ToolIcon = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: 0.3ms ease-in-out;
  :hover {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

export const ExerciseName = styled.p`
  max-height: 50px;
  text-align: left;
  width: 100%;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 27px;
  color: #ffffff;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ExerciseSummary = styled.p<{
  show: boolean;
}>`
  transition: 300ms ease-in;
  width: 100%;
  max-height: 200px;
  margin-top: 20px;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  display: block;
  display: -webkit-box;
  align-items: start;
  color: #000000;
  overflow: hidden;
  transition: 0.2ms ease-in-out;
  height: ${({ show }) => (show ? "fit-content" : 0)};
`;
