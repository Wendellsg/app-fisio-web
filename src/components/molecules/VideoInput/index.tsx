/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { MdVideoLibrary } from "react-icons/md";
import { THEME } from "../../../theme";
import { OwnPlayer } from "../../OwnPlayer";
import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";
import { DefaultButton } from "../Buttons";

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
    <Box
      width="100%"
      height="fit-content"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="1rem"
      flexDirection="column"
    >
      <Paragraph fontWeight="bold" size="xs">
        {label}
      </Paragraph>
      <Box
        width={width}
        height={height}
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        flexDirection="column"
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
                borderRadius: "0.5rem",
                border: `2px dotted ${THEME.colors.primary}`,
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
          icon={<MdVideoLibrary />}
        />
      </Box>
    </Box>
  );
};
