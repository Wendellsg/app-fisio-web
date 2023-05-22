/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { Box } from "../../atoms/layouts";
import { Label } from "../../atoms/forms";

export const ImageInput = ({
  onChange,
  value,
  name,
  label,
  placeholder,
  width,
  height,
  borderRadius,
  Border,
}) => {
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box
      width="100%"
      height="fit-content"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="1rem"
    >
      <Label>{label}</Label>
      <Box
        width={width}
        height={height}
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleImageChange}
          style={{
            width: "0",
            height: "0",
            opacity: 0,
            cursor: "pointer",
          }}
          ref={inputRef}
        />

        <img
          src={value}
          alt="Imagem do exercício"
          onClick={() => {
            inputRef.current?.click();
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            border: Border,
            borderRadius: borderRadius,
            cursor: "pointer",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          }}
        />
      </Box>
    </Box>
  );
};
