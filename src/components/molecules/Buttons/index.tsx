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
  onSubmit,
}: {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type: "submit" | "negation" | "disabled" | "neutral";
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  maxHeight?: string;
  onSubmit?: () => void;
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      maxWidth={maxWidth}
      minWidth={minWidth}
      height={height}
      width={width}
      onSubmit={onSubmit}
    >
      {text}
      {icon && icon}
    </Button>
  );
};
