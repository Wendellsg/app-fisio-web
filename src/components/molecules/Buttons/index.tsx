import { Button } from "./styles";

export const DefaultButton = ({
  text,
  onClick,
  type,
  icon,
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
}: {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type: "confirmation" | "negation" | "disabled" | "neutral";
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  maxHeight?: string;
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      maxWidth={maxWidth}
      minWidth={minWidth}
      height={height}
      width={width}
    >
      {text}
      {icon && icon}
    </Button>
  );
};
