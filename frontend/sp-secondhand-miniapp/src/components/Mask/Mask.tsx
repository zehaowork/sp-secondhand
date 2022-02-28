import React from "react";
import { ITouchEvent, View } from "@tarojs/components";
import s from "./Mask.css";
interface Props {
    isActive: boolean;
    onClick:(event?: ITouchEvent<any>) => void;
}

const Mask: React.FC<Props> = (props) => {
  return props.isActive ? <View onClick={props.onClick} className={s.container}></View> : null;
};
export default Mask;
