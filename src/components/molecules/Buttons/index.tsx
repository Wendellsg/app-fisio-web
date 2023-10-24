import { THEME } from "../../../theme";
import LoadingIcone from "../../LoadingIcone";
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
  isLoading,
  disabled,
  loadingText,
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
  isLoading?: boolean;
  disabled?: boolean;
  loadingText?: string;
}) => {
  return (
    <Button
      type={disabled ? "disabled" : type}
      onClick={() => {
        if (!disabled) {
          onClick && onClick();
        }
      }}
      maxWidth={maxWidth}
      minWidth={minWidth}
      height={height}
      width={width}
      onSubmit={onSubmit}
    >
      {isLoading && (
        <>
          {loadingText && loadingText}
          <LoadingIcone color={THEME.colors.black}/>
        </>
      )}

      {!isLoading && (
        <>
          {text}
          {icon && icon}
        </>
      )}
    </Button>
  );
};
