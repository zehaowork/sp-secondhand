import { View, Text } from "@tarojs/components";
import React, { useState, useEffect } from "react";
import Taro from '@tarojs/taro';
import s from "./index.css";
import Tag from "../../components/Tag/Tag";
import GoodsList from "../../components/GoodsList/GoodsList";
import API from "../../../utils/API";
import { Item } from "src/typings/common";

interface Props {}
const Index: React.FC<Props> = () => {
  const [items, setItems] = useState<Item[]>(); //item list
  const [itemList, setItemList] = useState<Item[]>();
  const [activeId, setActiveId] = useState(0);
  const [tagSize, setTagSize] = useState<number>();


  useEffect(() => {
    getItems();
  }, []);

  //TODO: 下拉刷新
  //TODO: 分页

  const getItems = () => {
    API.SecondHand.getSecondHandByUserId({
      userId:4, 
      page:0,
      size:10,
    })
      .then((res) => {
        if (res.statusCode === 200) {
          // console.log(res.data.data);
          setItems(res.data.data);
          setItemList(res.data.data.filter((item) => item.status != "Unpublished"));
        }
      })
      .catch((err) => {
        //TODO:添加错误信息
      });
  };

  const handleFilter = (status: string) => {
    var itemList;
      if (status == "All") {
        itemList = items?.filter((item) => item.status != "Unpublished");
      } else {
        itemList = items?.filter((item) => item.status == status);
      }
      setItemList(itemList);
      setTagSize(itemList.length);
  };

  const handleUnpublished = () => {
    var itemList = items?.filter((item) => item.status == "Unpublished");
    Taro.navigateTo({
        url: "./unpublished/index?itemlist=" + JSON.stringify(itemList),
      });
  }

  return (
    <View className={s.container}>
      <View className={s.indicator}>
        <View className={s.tags}>
          <Tag
            size="normal"
            onClick={() => {
              handleFilter("All");
              setActiveId(0);
            }}
            active={activeId == 0 ? true : false}
          >
            全部商品
          </Tag>
          <Tag
            size="normal"
            onClick={() => {
              handleFilter("OnSale");
              setActiveId(1);
            }}
            active={activeId == 1 ? true : false}
          >
            在售 {activeId == 1? tagSize: ""}
          </Tag>
          <Tag
            size="normal"
            onClick={() => {
              handleFilter("Sold");
              setActiveId(2);
            }}
            active={activeId == 2 ? true : false}
          >
            已售 {activeId == 2? tagSize: ""}
          </Tag>
        </View>
        <View className={s.archive} onClick={() => handleUnpublished()}>
          <Text>下架商品</Text>
        </View>
      </View>
      {itemList != undefined && (
        <GoodsList
          showLoading
          showPlaceholder
          isFavouritesPage={false}
          itemList={itemList}
          isShopPage={true}
        ></GoodsList>
      )}
    </View>
  );
};

export default Index;
