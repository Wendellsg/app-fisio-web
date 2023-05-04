/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { CenteredColumn, CenteredRow } from "../../atoms/layouts";
import { Label } from "../../atoms/forms";
import { DefaultButton } from "../Buttons";
import { OwnPlayer } from "../../OwnPlayer";

export const VideoInput = ({ onChange, value, name, label, width, height }) => {
  const handleVideoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <CenteredColumn
      width="100%"
      height="fit-content"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="1rem"
    >
      <Label>{label}</Label>
      <CenteredColumn
        width={width}
        height={height}
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <input
          type="file"
          name={name}
          accept="video/*"
          onChange={handleVideoChange}
          style={{
            width: "0",
            height: "0",
            opacity: 0,
            cursor: "pointer",
          }}
          ref={inputRef}
        />

        {value && (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <video
              src={value}
              style={{
                width: "100%",
                height: "100%",
              }}
              ref={videoRef}
            />
            <OwnPlayer $videoRef={videoRef} videoName={name} />
          </div>
        )}
        <DefaultButton
          text={value ? "Mudar video" : "Carregar video"}
          type="neutral"
          onClick={() => inputRef.current?.click()}
        />
      </CenteredColumn>
    </CenteredColumn>
  );
};
