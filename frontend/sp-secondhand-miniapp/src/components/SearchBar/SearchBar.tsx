import React from "react";
import { Input, View } from "@tarojs/components";
import s from "./SearchBar.css";
import { AtIcon } from "taro-ui";

interface Props {
  //事件
  onInput: any; //搜索框输入事件
  onFocus?: any;
  onClear?: any;
  onBlur?: any;
  onConfirm: any; //输入框确认事件
  onClick: any; // 搜索按钮点击事件
  onActionClick?: any;

  //参数
  placeholder?: string; // 输入框提醒标题
  maxlength?: number; //最长框最长长度
  actionName?: string;
  keyword: string; //搜索框输入value
}

const SearchBar: React.FC<Props> = (props) => {
  return (
    <View className={s.container}>
      <View className={s.search}>
        <View className={s.icon}>
          <AtIcon value="search" size="13" color="F00" />
        </View>
        {/* 输入框 */}
        <Input
          onInput={(e) => {
            props.onInput(e.detail.value);
          }}
          onConfirm={props.onConfirm}
          className={s.input}
          placeholder={props.placeholder}
          confirmType="search"
          value={props.keyword}
        />
      </View>
      <View className={s.action}>
        <View onClick={props.onClick} className={s.btn}>
          搜索
        </View>
      </View>
    </View>
  );
};
export default SearchBar;
