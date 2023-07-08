import { THEME } from "../../../theme";
import { StyledInput, StyledLabel } from "../../atoms/forms";
import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";
import * as S from "./styles";

interface InputProps {
  label: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  placeholder?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  minWidth?: string;
  error?: string;
  register?: any;
  onEnterPress?: () => void;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  width,
  height,
  maxWidth,
  minWidth,
  error,
  register = () => {},
  onEnterPress,
  disabled,
}) => {
  return (
    <Box flexDirection="column" width={width}>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        placeholder={placeholder}
        width={width}
        height={height}
        maxWidth={maxWidth}
        minWidth={minWidth}
        type={type}
        id={name}
        error={!!error}
        value={value}
        onChange={(e) => onChange && onChange(e)}
        {...register(name)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnterPress && onEnterPress();
          }
        }}
        disabled={disabled}
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

export const TextArea: React.FC<{
  name?: string;
  register?: any;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  errorMessage?: string | null;
  required?: boolean;
  disabled?: boolean;
  width?: string;
}> = ({
  name,
  register = () => {},
  placeholder,
  value,
  onChange,
  label,
  errorMessage,
  required,
  disabled,
  width,
}) => {
  return (
    <S.TextAreaContainer>
      <StyledLabel>{label}</StyledLabel>
      <S.TextArea
        name={name}
        {...register(name, { required })}
        placeholder={placeholder}
        error={!!errorMessage}
        required={required}
        disabled={disabled}
        width={width}
        value={value}
        onChange={(e) => onChange && onChange(e)}
      />
      {!!errorMessage && <S.ErrorMensage>{errorMessage}</S.ErrorMensage>}
    </S.TextAreaContainer>
  );
};

export const Toggle: React.FC<{
  name?: string;
  register?: any;
  label?: string;
  errorMessage?: string | null;
  required?: boolean;
  disabled?: boolean;
  value: boolean;
}> = ({ name, register, label, errorMessage, required, value }) => {
  return (
    <S.ToggleContainer>
      <StyledLabel>{label}</StyledLabel>

      <S.Toggle checked={value}>
        <input
          type="checkbox"
          {...register(name, { required })}
          name={name}
          style={{
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </S.Toggle>

      {!!errorMessage && <S.ErrorMensage>{errorMessage}</S.ErrorMensage>}
    </S.ToggleContainer>
  );
};
