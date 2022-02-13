import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import s from "./index.css";
import { AtIcon } from "taro-ui";
import WeixinIcon from "../../images/weixin.png";
import MobileIcon from "../../images/phone.png";
import MessageIcon from "../../images/chat.png";
import SellerShopIcon from "../../images/shop1.png";
import { addFavorite, deleteFavorite } from "../../actions/favorite";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../../../utils/Utils";

enum Conditions {
  BrandNew = "全新",
  LikeNew = "几乎全新",
  MinorFlaw = "轻微划痕",
  ObviousFlaw = "明显划痕",
}

const Index: React.FC = () => {
  const $instance = Taro.getCurrentInstance(); //页面对象
  const item =
    $instance.router?.params.item === undefined
      ? ""
      : JSON.parse($instance.router?.params.item);
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [imgList, setImgList] = useState<String[]>();
  const [previousPosition, setPreviousPosition] = useState(0);
  const [isNewFav, setIsNewFav] = useState(false);
  const dispatch = useDispatch();
  const favorite = useSelector(({ favorite }) => favorite);

  //渲染函数
  useEffect(() => {
    // Image List
    var imgs = item.imgUrls;
    if (imgs != undefined && imgs != null) {
      setImgList(imgs);
    }
  }, []);

  const isFav =
    item != undefined
      ? favorite.favorites.some((fav) => fav.id === item.id)
      : false;

  //加入收藏
  const add = () => {
    if (item != undefined) {
      dispatch(addFavorite({ userId: 4, item: item }));
      setIsNewFav(true);
    }
  };

  //删除收藏
  const del = () => {
    if (item != undefined) {
      dispatch(deleteFavorite({ userId: 4, item: item }));
      setIsNewFav(false);
    }
  };

  //复制卖家联系方式
  const copyToClipboard = (contactDetail: string) => {
    Taro.setClipboardData({
      data: contactDetail,
      success: function () {
        Taro.showToast({
          title: "复制成功",
          icon: "success",
        });
      },
    });
  };

  //TODO: 跳转到聊天室
  const toChatroom = () => {
    Taro.navigateTo({
      url: "../chatboard/index",
    });
  };

  //TODO: 跳转到商家店铺
  const toShopPage = () => {
    Taro.navigateTo({
      url: "../shop/index?id=" + item?.userId,
    });
  };

  const hideNumbers = (number: string) => {
    var hiddenString = "";
    for (var i = 0; i < number.length; i++) {
      hiddenString += "*";
    }
    return hiddenString;
  };

  const onScroll = (e) => {
    var currentPosition = e.detail.scrollTop;
    var diff = previousPosition - currentPosition;

    if (currentPosition <= 10 || diff > 0) {
      setShowTopHeader(true);
    } else {
      setShowTopHeader(false);
    }
    setPreviousPosition(currentPosition);
  };

  const getCondition = (condition: string) => {
    return Conditions[condition];
  };

  return (
    <View className={s.container}>
      <View className={showTopHeader ? s.header_top : s.header_hide}>
        <View className={s.content}>
          <View className={s.user}>
            <Image
              src={
                item?.userProfileImgUrl != undefined
                  ? item?.userProfileImgUrl
                  : ""
              }
              className={s.avatar_lg}
            />
            <View className={s.infotag}>
              <View className={s.name}>{item?.userName}</View>
              <View>
                {Utils.formatDate(item?.publishTime)}
                发布于
                <Text style={{ fontWeight: 500 }}> {item?.cityName}</Text>
              </View>
            </View>
            <AtIcon
              className={s.heart}
              value={isFav ? "heart-2" : "heart"}
              size="25"
              color={isFav ? "#e54d42" : "#aaaaaa"}
              onClick={isFav ? del : add}
            />
          </View>
        </View>
      </View>

      <View className={s.thin_divider}></View>

      <ScrollView
        scrollY
        onScroll={onScroll}
        enableFlex
        style={{ height: "100vh" }}
      >
        {/* 商品信息 */}
        <View className={s.body_details}>
          <View className={s.price}>£ {item?.price}</View>
          <Text className={".text-Body"}>{item?.description}</Text>

          {item?.categoryName != undefined && (
            <View className={s.category_label}>
              产品类型
              <View className={s.category}> {item.categoryName} </View>
            </View>
          )}

          {item?.condition != undefined && (
            <View className={s.category_label}>
              新旧程度
              <View className={s.category}>
                {" "}
                {getCondition(item?.condition)}{" "}
              </View>
            </View>
          )}

          {imgList != undefined &&
            imgList.map((img) => (
              <Image
                src={"http://120.79.59.51:8087/" + img}
                mode="widthFix"
                className={s.image}
              ></Image>
            ))}
        </View>

        <View className={s.regular_divider}></View>

        {/* 卖家信息 */}
        <View className={s.contact_body}>
          <View className={s.header}>
            <View className={s.content}>
              <View className={s.user}>
                <Image
                  src={
                    item?.userProfileImgUrl != undefined
                      ? item?.userProfileImgUrl
                      : ""
                  }
                  className={s.avatar_lg}
                />
                <View className={s.name}>{item?.userName}</View>
              </View>
              <View className={s.btn}>
                <View className={s.btn_with_icon} onClick={toChatroom}>
                  <Image src={MessageIcon} className={s.icon} />
                  <Text>联系卖家</Text>
                </View>
                <View className={s.btn_with_icon} onClick={toShopPage}>
                  <Image src={SellerShopIcon} className={s.icon} />
                  <Text>Ta的店铺</Text>
                </View>
              </View>
            </View>
          </View>

          <View className={s.thin_divider}></View>

          <View className={s.user}>
            <View className={s.contact_label}>交易地址</View>
            <View className={s.contact}> {item?.address}</View>
          </View>

          <View className={s.user}>
            <View className={s.contact_label}>联系方式</View>
            <View className={s.contact}>
              (加好友时请注明是【小土豆二手】上看到的)
            </View>
          </View>

          {item?.weChatId != undefined && item.weChatId != "" && (
            <View className={s.user}>
              <View
                className={s.contact_content}
                onClick={() => copyToClipboard(item.weChatId)}
              >
                <View className={s.contact_icon_container}>
                  <Image src={WeixinIcon} className={s.icon} />
                  {hideNumbers(item.weChatId)}
                </View>
                <View className={s.copy}> 点击复制卖家微信</View>
              </View>
            </View>
          )}

          {item?.telephone != undefined && item.telephone != "" && (
            <View className={s.user}>
              <View
                className={s.contact_content}
                onClick={() => copyToClipboard(item.telephone)}
              >
                <View className={s.contact_icon_container}>
                  <Image src={MobileIcon} className={s.icon} />
                  {hideNumbers(item.telephone)}
                </View>
                <View className={s.copy}> 点击复制卖家电话</View>
              </View>
            </View>
          )}
        </View>

        <View className={s.regular_divider}></View>

        {/* 警告 */}
        <View className={s.warning}>
          免责声明: 以上信息是发布者自行发布, 请
          <Text className={s.yellow}>【保持警惕】</Text>
          ，如遇违规行为，可进入【我的首页】联系客服举报。
        </View>
        <Text className={s.sp_label}>Produced by: 小土豆技术团队2021</Text>
      </ScrollView>
    </View>
  );
};

export default Index;
