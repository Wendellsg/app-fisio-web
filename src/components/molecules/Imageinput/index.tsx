/* eslint-disable @next/next/no-img-element */
'use client';
import { useRef } from "react";

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
    <div className="flex gap-4 items-start w-full justify-start flex-col h-fit">
      <p className="font-bold text-xs">
        {label}
      </p>
      <div
        className={`flex justify-center items-center w-[${width}] gap-4 h-[${height}] `}
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
            border: Border,
            borderRadius: borderRadius,
          }}
          className="w-full h-full object-cover cursor-pointer shadow-md"
        />
      </div>
    </div>
  );
};
