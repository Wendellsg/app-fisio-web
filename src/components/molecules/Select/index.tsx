import React, { useEffect, useState } from "react";
import { StyledLabel } from "../../atoms/forms";
import { Paragraph } from "../../atoms/typograph";
import * as S from "./styles";

interface IOption {
  label: string;
  value: string;
}

export const Select: React.FC<{
  options: IOption[];
  label: string;
  value: IOption;
  onChange?: (value: IOption) => void;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  margin?: string;
  register?: any;
  error?: string;
}> = ({
  options,
  label,
  value,
  onChange,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  margin,
  error,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleOptionClick = (option: IOption) => {
    onChange && onChange(option);
    setShowOptions(false);
  };

  const selectRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // detect click outside

    const handleClickOutside = (event: any) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <S.SelectContainer
      width={width || "100%"}
      minWidth={minWidth}
      maxWidth={maxWidth}
      minHeight={minHeight}
      margin={margin}
      ref={selectRef}
    >
      <StyledLabel>{label}</StyledLabel>

      <S.Select
        height={showOptions ? "fit-content" : height}
        opened={showOptions}
        onClick={() => setShowOptions(!showOptions)}
        width={width}
      >
        <S.Option
          isLabel
          selected={value && !showOptions ? true : false}
          opened={showOptions}
        >
          {showOptions || !value?.label ? label : value?.label}
        </S.Option>
        {options.map((option) => (
          <S.Option
            height={height}
            key={option.value}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </S.Option>
        ))}
      </S.Select>
      {error && (
        <Paragraph
          fontWeight="bold"
          size="sm"
          style={{
            color: "red",
          }}
        >
          {error}
        </Paragraph>
      )}
    </S.SelectContainer>
  );
};
