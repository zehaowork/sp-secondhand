import Taro from "@tarojs/taro";
import { View, Image, RichText } from "@tarojs/components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AtActionSheet, AtActionSheetItem, AtIcon } from "taro-ui";
import "taro-ui/dist/style/components/action-sheet.scss";
import s from "./Card.css";
import { Item } from "src/typings/common";
import TypeTag from "./TypeTag/TypeTag";

import CityTag from "./CityTag/CityTag";
import Avatar from "../Avatar/Avatar";
import CategoryTag from "./CategoryTag/CategoryTag";
import { Utils } from "../../../utils/Utils";

import { addFavorite, deleteFavorite } from "../../actions/favorite";
import API from "../../../utils/API";

interface Props {
  item: Item;
  isFavouritesPage?: boolean;
  isShopPage?: boolean;
  keyword?: string;
}

//商品显示组件
const Card: React.FC<Props> = (props) => {
  //定义状态
  const [isOpened, setIsOpened] = useState(false);
  const [isNewFav, setIsNewFav] = useState(false);
  const dispatch = useDispatch();
  const favorite = useSelector(({ favorite }) => favorite);

  //定义行为

  // 打开商品详情
  const toDetail = () => {
    Taro.navigateTo({
      url: "../detail/index?item=" + JSON.stringify(props.item),
    });
  };

  //加入收藏
  const add = () => {
    dispatch(addFavorite({ userId: 4, item: props.item }));
    setIsNewFav(true);
  };

  //删除收藏
  const del = () => {
    dispatch(deleteFavorite({ userId: 4, item: props.item }));
    setIsNewFav(false);
  };

  const isFav = favorite.favorites.some((fav) => fav.id === props.item.id);
  //渲染函数
  useEffect(() => {
    if (!isFav) {
      setIsNewFav(false);
    }
  }, [isFav]);

  var onClick = (e) => {
    e[0].stopPropagation();
    isFav ? del() : add();
  };

  const handleDots = (e) => {
    e.stopPropagation();
    setIsOpened(!isOpened);
  };

  const toPublish = () => {
    Taro.redirectTo({
      url: "/src/pages/publish/index?itemId=" + props.item.id,
    });
  };

  const modifyStatus = (status: string) => {
    API.SecondHand.modifySecondHand({ ...props.item, status: status }).then(
      (res) => {
        if (res.statusCode === 200) {
          Taro.showToast({
            title: "修改成功",
            icon: "success",
          });
        }
      }
    );
  };

  const handleDelete = () => {
    API.SecondHand.deleteSecondHand(props.item.id).then((res) => {
      if (res.statusCode === 200) {
        Taro.showToast({
          title: "删除成功",
          icon: "success",
        });
      }
    });
  };

  return (
    // TODO: 已售UI
    <View onClick={toDetail} className={s.container}>
      <View className={s.item}>
        <Image
          src={"http://120.79.59.51:8087/" + props.item.imgUrls[0]}
          mode="aspectFill"
          className={s.image}
        ></Image>
        <View className={s.icon}>
          <AtIcon
            className={isNewFav && s.heartBeat}
            value={isFav ? "heart-2" : "heart"}
            size="20"
            color={isFav ? "#e54d42" : "white"}
            onClick={onClick.bind(this)}
          />
        </View>
      </View>

      <View className={s.info}>
        {/* 商品小标签 */}
        {!props.isShopPage && (
          <View className={s.tags}>
            <CityTag CityName={props.item.cityName} />
            <TypeTag GoodType={props.item.type} />
            <CategoryTag CategoryName={props.item.categoryName} />
          </View>
        )}

        {/* 商品名字 以及商品价格 */}
        <View className="flex flex-space-between">
          <View className={s.title}>
            <RichText
              nodes={Utils.highlightKeyword(
                props.keyword,
                props.item.title,
                "#ff8601"
              )}
            />
          </View>
          {!props.isShopPage && (
            <View className="price-yellow">£{props.item.price}</View>
          )}
        </View>

        {/* 编辑按钮 - 只在商品列表下显示 */}
        {props.isShopPage && (
          <View className="flex flex-space-between">
            <View className="price-yellow">£{props.item.price}</View>
            <View onClick={handleDots.bind(this)}>
              <View className={s.dot}></View>
              <View className={s.dot}></View>
              <View className={s.dot}></View>
            </View>
          </View>
        )}

        {/* 商家信息 */}
        {(!props.isShopPage || !props.isFavouritesPage) && (
          <View className="flex flex-space-between">
            <View className={s.user}>
              <Avatar size="sm" imageUrl={props.item.userProfileImgUrl} />
              <View className={s.name}>{props.item.userName}</View>
            </View>
            <View className={s.name}>{props.item.popularity}人看过</View>
          </View>
        )}
      </View>
      {/* 编辑商品 */}
      <View onClick={(e) => e.stopPropagation()}>
        <AtActionSheet
          isOpened={isOpened}
          cancelText="取消"
          onCancel={() => setIsOpened(false)}
          onClose={() => setIsOpened(!isOpened)}
        >
          {/* TODO: REDUX */}
          <AtActionSheetItem onClick={() => toPublish()}>
            重新编辑
          </AtActionSheetItem>
          {props.item.status == "OnSale" && (
            <AtActionSheetItem onClick={() => modifyStatus("Sold")}>
              已经售出
            </AtActionSheetItem>
          )}
          {props.item.status == "OnSale" && (
            <AtActionSheetItem onClick={() => modifyStatus("Unpublished")}>
              暂时下架
            </AtActionSheetItem>
          )}
          {props.item.status == "Unpublished" && (
            <AtActionSheetItem onClick={() => modifyStatus("OnSale")}>
            上架商品
          </AtActionSheetItem>
          )}
          <AtActionSheetItem onClick={() => handleDelete()}>
            彻底删除
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    </View>
  );
};
export default Card;
