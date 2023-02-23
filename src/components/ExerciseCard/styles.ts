import styled from "styled-components";
export const ExerciseCard = styled.div`
  width: 250px;
  height: 360px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 10px;
  cursor: pointer;

  :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

/* export const exerciseSummary = styled.p`
    
    font-family: 'Nunito';
    font-size: 12px;
    font-weight: bold;
`; */

export const ExerciseCardInfos = styled.div`
  transition: 300ms ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
  height: 150px;
  position: relative;
  top: 163px;
  padding: 10px 15px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  border-radius: 10px;
  overflow: hidden;
  text-overflow: clip;
  align-items: flex-start;

  :hover {
    justify-content: center;
    transition: 300ms ease-in;
    height: 100%;
    top: -46px;
    filter: drop-shadow(0px 14px 28px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25));
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

export const ExerciseSummary = styled.p`
  transition: 300ms ease-in;
  position: relative;
  bottom: 0px;
  width: 100%;
  height: fit-content;
  max-height: 200px;
  opacity: 0;
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
  text-overflow: ellipsis;
  -webkit-line-clamp: 20;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;