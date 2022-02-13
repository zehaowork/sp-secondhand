import React from "react";
import { View, Button, Image } from "@tarojs/components";
import s from "./SystemButton.css";

interface Props {
  type: string;
  text: string;
  src: string;
  color: "GREEN" | "ORANGE";
}

const SystemButton: React.FC<Props> = (props) => {
  return (
    <View className={s.container}>
      <Button
        className={props.color === "GREEN" ? s.button_green : s.button_orange}
        openType={props.type}
      >
        {props.text}
        <Image src={props.src} className={s.image} />
      </Button>
    </View>
  );
};
export default SystemButton;
