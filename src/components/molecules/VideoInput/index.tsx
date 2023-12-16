/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { MdVideoLibrary } from "react-icons/md";
import { VideoPlayer } from "../../OwnPlayer";
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
          <VideoPlayer
            borderRadius="10px"
            image={""}
            video={value}
            name={"name"}
          />
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
