import { View, ScrollView, Swiper, SwiperItem } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import React from "react";
import { useDispatch } from "react-redux";
import s from "./index.css";
import ChatItem from "../../components/ChatItem/ChatItem";
import Indicator from "../../components/Indicator/Indicator";
import { changeIndex } from "../../actions/tab-bar";

interface Props {}
const Index: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const arr = [1, 2];
  const arr2 = [1, 2, 3];
  useDidShow(() => dispatch(changeIndex(2)));
  const chatItems = arr.map((value) => {
    return <ChatItem></ChatItem>;
  });
  const chatItems2 = arr2.map((value) => {
    return <ChatItem></ChatItem>;
  });
  return (
    <View>
      <Indicator />
      <Swiper className={s.swiper}>
        <SwiperItem>
          <ScrollView>{chatItems}</ScrollView>
        </SwiperItem>
        <SwiperItem>
          <ScrollView>{chatItems2}</ScrollView>
        </SwiperItem>
      </Swiper>
    </View>
  );
};

export default Index;
