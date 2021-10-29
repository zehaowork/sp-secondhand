import { View } from "@tarojs/components";
import React from "react";
import Taro from '@tarojs/taro';
import s from "./index.css";
import GoodsList from "../../../components/GoodsList/GoodsList";

interface Props {}
const Index: React.FC<Props> = () => {
  const $instance = Taro.getCurrentInstance(); //页面对象
  const itemList = $instance.router?.params.itemlist === undefined
      ? ""
      : JSON.parse($instance.router?.params.itemlist);

  return (
    <View className={s.container}>
        <GoodsList
          showLoading
          showPlaceholder
          isFavouritesPage={false}
          itemList={itemList}
          isShopPage={true}
        ></GoodsList>
    </View>
  );
};

export default Index;
