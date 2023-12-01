import { useState } from "react";
import { CgCheck, CgClose } from "react-icons/cg";
import { THEME } from "../../../theme";
import LoadingIcon from "../../LoadingIcon";
import { Box } from "../../atoms/layouts";
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
  confirmation = false,
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
  confirmation?: boolean;
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  if (showConfirmation) {
    return (
      <Box
        width="fit-content"
        height={height || "40px"}
        alignItems="center"
        gap="1rem"
        justifyContent="center"
      >
        <Box
          onClick={() => {
            setShowConfirmation(false);
            onClick && onClick();
          }}
          height="40px"
          width="40px"
          borderRadius="10px"
          alignItems="center"
          justifyContent="center"
          backgroundColor={
            type === "negation"
              ? THEME.colors.danger
              : type === "neutral"
              ? THEME.colors.darkness
              : THEME.colors.success
          }
          style={{
            border: `1px solid ${
              type === "negation"
                ? THEME.colors.danger
                : type === "neutral"
                ? THEME.colors.darkness
                : THEME.colors.success
            }`,
            cursor: "pointer",
          }}
        >
          <CgCheck size={25} color={THEME.colors.white} cursor={"pointer"} />
        </Box>

        <Box
          height="40px"
          width="40px"
          borderRadius="10px"
          alignItems="center"
          justifyContent="center"
          onClick={() => setShowConfirmation(false)}
          style={{
            cursor: "pointer",
          }}
          backgroundColor="black"
        >
          <CgClose size={20} color={THEME.colors.white} cursor={"pointer"} />
        </Box>
      </Box>
    );
  }

  return (
    <Button
      type={disabled ? "disabled" : type}
      onClick={() => {
        if (!disabled) {
          if (confirmation) {
            setShowConfirmation(true);
            return;
          }
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
          <LoadingIcon color={THEME.colors.black} size={20} />
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
