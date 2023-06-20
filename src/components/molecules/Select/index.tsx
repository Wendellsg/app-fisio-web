import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { Paragraph } from "../../atoms/typograph";
import { StyledLabel } from "../../atoms/forms";

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
  error: string;
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

  return (
    <S.SelectContainer
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      minHeight={minHeight}
      margin={margin}
    >
      <StyledLabel>{label}</StyledLabel>

      <S.Select
        height={showOptions ? "fit-content" : height}
        opened={showOptions}
        onClick={() => setShowOptions(!showOptions)}
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
      {error && <Paragraph fontWeight="bold" size="sm" style={{
        color: "red",
      }}>{error}</Paragraph>}
    </S.SelectContainer>
  );
};
