import styled from "styled-components";
import { ThemeColors } from "../../theme/colors";

const AvatarSizes = {
  large: "200px",
  medium: "100px",
  small: "50px",
};

export const AvatarContainer = styled.div<{
  size?: string;
  pointer?: boolean;
}>`
  width: ${({ size }) => AvatarSizes[size || "medium"]};
  height: ${({ size }) => AvatarSizes[size || "medium"]};
  border-radius: 50%;
  aspect-ratio: 1/1;
  background: ${ThemeColors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: ${({ pointer }) => (pointer ? "pointer" : "default")};
`;

export const AvatarImage = styled.img`
  display: flex;
  width: 95%;
  height: 95%;
  border-radius: 50%;
  border: 4px solid #fff;
  object-fit: cover;
`;
