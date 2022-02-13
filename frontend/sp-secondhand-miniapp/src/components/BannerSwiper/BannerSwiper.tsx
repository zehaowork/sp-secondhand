import React from "react";
import Taro from "@tarojs/taro";
import { Swiper, View, SwiperItem, Image } from "@tarojs/components";
import s from "./BannerSwiper.css";
import { Banner } from "src/typings/common";

interface Props {
  imageList: Banner[];
}

const BannerSwiper: React.FC<Props> = (props) => {
  //去公众号页面
  const toWebView = (url) => {
    if (url) {
      Taro.navigateTo({
        url: "/pages/webview/index?url=" + url,
      });
    }
  };

  //渲染函数
  const renderImage = props.imageList.map((banner) => (
    <SwiperItem key={banner.id}>
      <Image
        onClick={() => {
          toWebView(banner.link);
        }}
        mode="aspectFill"
        src={"http://120.79.59.51:8087/" + banner.imgUrl}
        className={s.image}
      />
    </SwiperItem>
  ));

  return (
    <View className={s.container}>
      <Swiper autoplay className={s.swiper}>
        {renderImage}
      </Swiper>
    </View>
  );
};
export default BannerSwiper;
