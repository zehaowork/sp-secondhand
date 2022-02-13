import React from "react";
import { View } from "@tarojs/components";
import s from "./Tag.css";

interface Props {
  //参数
  size: "normal" | "small";
  name?: string; //字样
  circle?: boolean; //圆形样式
  active?: boolean; //激活状态
  children?: React.ReactNode; //子组件
  //事件
  onClick: any;
}

const Tag: React.FC<Props> = (props) => {
  return (
    <View
      onClick={props.onClick}
      className={` ${s.container} ${props.active ? s.active : s.passive} ${
        props.size === "small" && s.small
      } ${props.circle && s.circle}`}
    >
      {props.children ? props.children : props.name}
    </View>
  );
};
export default Tag;
