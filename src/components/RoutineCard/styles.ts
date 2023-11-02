import styled from "styled-components";
import { Box } from "../atoms/layouts";

export const ActivityCardContainer = styled(Box)`
  border-bottom: 2px solid #e0e0e0;
  grid-template-columns: 1fr;
  justify-content: center;
  gap: 1rem;
  padding-bottom: 1rem;

  > * {
    margin: 0 auto;
  }
  @media (min-width: 1100px) {
    grid-template-columns: 310px auto;
    grid-template-rows: 1fr;
  }
`;
