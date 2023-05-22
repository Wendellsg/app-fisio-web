import { THEME } from "../../../theme";
import { StyledInput, StyledLabel } from "../../atoms/forms";
import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  minWidth?: string;
  error?: string;
  register?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  placeholder,
  width,
  height,
  maxWidth,
  minWidth,
  error,
  register,
}) => {
  return (
    <Box flexDirection="column">
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        placeholder={placeholder}
        width={width}
        height={height}
        maxWidth={maxWidth}
        minWidth={minWidth}
        type={type}
        error={!!error}
        {...register(name)}
      />
      {error && (
        <Paragraph
          fontWeight="bold"
          size="xs"
          style={{
            color: THEME.colors.danger,
            marginLeft: "10px",
            marginTop: "5px",
          }}
        >
          {error}
        </Paragraph>
      )}
    </Box>
  );
};
