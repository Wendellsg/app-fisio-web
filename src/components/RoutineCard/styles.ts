import styled from "styled-components";
import { Box } from "../atoms/layouts";

export const ActivityCardContainer = styled(Box)`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.2) 0%,
    #ffffff 100%
  );
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5));
  background-size: cover;
  background-repeat: no-repeat;

  > div {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.2) 0%,
      #ffffff 100%
    );

    height: 100%;
    width: 100%;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }
`;
