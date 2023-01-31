import React from "react";
import { AvatarContainer, AvatarImage, ChangeAvatarButton } from "./styles";
import Router from "next/router";
import { MdAddAPhoto } from "react-icons/md";

export const Avatar = ({
  src,
  size = "2rem",
  alt = "Avatar",
  url,
  changeAvatar,
}: {
  src: string;
  size?: string;
  alt?: string;
  url?: string;
  changeAvatar?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [showInputButton, setShowInputButton] = React.useState(false);

  const handleClick = () => {
    if (!url || !changeAvatar) return;
    if (url) {
      Router.push(url);
    } else if (changeAvatar) {
      console.log("change avatar");
      handleUploadClick();
    }
  };

  const handleUploadClick = () => {
    const input = document.getElementById("imgupload");
    input?.click();
  };

  return (
    <AvatarContainer
      size={size}
      onClick={handleClick}
      pointer={url || changeAvatar ? true : false}
      onMouseEnter={() => {
        if (!changeAvatar) return;
        setShowInputButton(true);
      }}
      onMouseLeave={() => {
        if (!changeAvatar) return;
        setShowInputButton(false);
      }}
    >
      <AvatarImage src={src} alt={"Fotografia de " + alt} />
      <input
        type="file"
        id="imgupload"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          changeAvatar(e);
          setShowInputButton(false);
        }}
      />

      {changeAvatar && (
        <ChangeAvatarButton onClick={handleUploadClick} show={showInputButton}>
          <MdAddAPhoto color="#000" size={25} />
        </ChangeAvatarButton>
      )}
    </AvatarContainer>
  );
};
