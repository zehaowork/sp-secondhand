import React from "react";
import { Input, View } from "@tarojs/components";
import s from "./SearchBarPlaceholder.css";
import { AtIcon } from "taro-ui";

interface Props {
  onClick: any;
}

const SearchBarPlaceholder: React.FC<Props> = (props) => {
  return (
    <View onClick={props.onClick} className={s.container}>
      <AtIcon value="search" size="14" color="F00" />
      <Input className={s.input} placeholder="点击搜索商品" disabled />
    </View>
  );
};
export default SearchBarPlaceholder;
