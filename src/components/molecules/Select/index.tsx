import React, { useEffect, useState } from "react";
import * as S from "./styles";

interface IOption {
  label: string;
  value: string;
}

export const Select: React.FC<{
  options: IOption[];
  label: string;
  value: IOption;
  onChange: (value: IOption) => void;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  margin?: string;
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
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  return (
    <S.SelectContainer
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      minHeight={minHeight}
      margin={margin}
    >
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
            onClick={() => {
              onChange(option);
            }}
          >
            {option.label}
          </S.Option>
        ))}
      </S.Select>
    </S.SelectContainer>
  );
};
