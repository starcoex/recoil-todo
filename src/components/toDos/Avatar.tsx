import React from "react";
import { StyledAvatar } from "./styledComponents/StyledComponents";

type AvatarProps = {
  src: string;
};
export default function Avatar({ src }: AvatarProps) {
  return <StyledAvatar src={src} alt="Avatar" />;
}
