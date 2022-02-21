import React from "react";
import { View } from "@tarojs/components";
import s from "./TypeTag.css";

enum GoodType {
  New = 0,
  Used = 1,
  Shop = 2,
}
interface Props {
  GoodType: GoodType;
}

const TypeTag: React.FC<Props> = (props) => {
  return (
    <View
      className={
        props.GoodType === GoodType.New
          ? s.new
          : props.GoodType === GoodType.Used
          ? s.used
          : s.shop
      }
    >
      {props.GoodType === GoodType.New
        ? "全新"
        : props.GoodType === GoodType.Used
        ? "二手"
        : "商家"}
    </View>
  );
};
export default TypeTag;
