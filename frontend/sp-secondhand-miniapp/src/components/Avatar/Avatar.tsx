import { OpenData, Image } from "@tarojs/components";
import React from "react";
import s from "./Avatar.css";
import AvatarPlaceHolder from "../../images/avatar_placeholder.png";

interface Props {
  size: "lg" | "sm" | "md";
  isAuthorized?: boolean;
  imageUrl?: string;
  onClick?: any;
}

const Avatar: React.FC<Props> = (props) => {
  return props.isAuthorized ? (
    <OpenData
      type="userAvatarUrl"
      className={props.size === "lg" ? s.avatar_lg : s.avatar_sm}
    ></OpenData>
  ) : (
    <Image
      onClick={props.onClick}
      src={props.imageUrl ? props.imageUrl : AvatarPlaceHolder}
      className={props.size === "lg" ? s.avatar_lg : s.avatar_sm}
    />
  );
};
export default Avatar;
