import React from "react";
import { AvatarContainer, AvatarImage } from "./styles";
import Router from "next/router";

export const Avatar = ({
  src,
  size = "2rem",
  alt = "Avatar",
  url,
}: {
  src: string;
  size?: string;
  alt?: string;
  url?: string;
}) => {
  const handleClick = () => {
    if (!url) return;
    Router.push(url);
  };

  return (
    <AvatarContainer
      size={size}
      onClick={handleClick}
      pointer={url ? true : false}
    >
      <AvatarImage src={src} alt={"Fotografia de " + alt} />
    </AvatarContainer>
  );
};
