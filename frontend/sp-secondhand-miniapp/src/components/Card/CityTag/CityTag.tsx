import React from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import s from "./CityTag.css";

interface Props {
  CityName: string;
}

const CityTag: React.FC<Props> = (props) => {
  return <View className={s.container}>{props.CityName}</View>;
};
export default CityTag;
