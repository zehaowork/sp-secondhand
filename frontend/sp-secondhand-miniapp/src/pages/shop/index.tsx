import { View, Text } from "@tarojs/components";
import React, { useState, useEffect } from "react";
import { getCurrentInstance } from "@tarojs/taro";
import s from "./index.css";
import Tag from "../../components/Tag/Tag";
import GoodsList from "../../components/GoodsList/GoodsList";
import { Item } from "src/typings/common";
import { useDispatch, useSelector } from "react-redux";
import { getMyItemList } from "../../actions/myItemList";
import { usePullDownRefresh } from "@tarojs/taro";

interface Props {}
const Index: React.FC<Props> = () => {
  let id: number | undefined;
  const [itemList, setItemList] = useState<Item[]>([]);
  const [activeId, setActiveId] = useState(0);
  const [tagSize, setTagSize] = useState<number>();
  const [isSelf, setIsSelf] = useState(false);

  const dispatch = useDispatch();
  const myItemList = useSelector(({ myItemList }) => myItemList); // 储存着reducer里面的三个state
  const selfId: number = useSelector(({ user }) => user.user.id);

  useEffect(() => {
    id = getCurrentInstance().router!.params.id as unknown as number;

    if (id) {
      dispatch(getMyItemList(id));
      setIsSelf(id == selfId);
    }
  }, []);

  useEffect(() => {
    if (myItemList.itemList.length != 0) {
      setItemList(
        myItemList.itemList.filter((item) => item.status != "Unpublished")
      );
    }
  }, [myItemList.itemList]);

  usePullDownRefresh(() => {
    if (id) dispatch(getMyItemList(id));
  });

  const handleFilter = (status: string) => {
    var itemList = [];
    if (status == "All") {
      itemList = myItemList.itemList.filter(
        (item) => item.status != "Unpublished"
      );
    } else {
      itemList = myItemList.itemList.filter((item) => item.status == status);
    }
    setItemList(itemList);
    setTagSize(itemList.length);
  };

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
            全部商品 {activeId == 0 ? tagSize : ""}
          </Tag>
          <Tag
            size="normal"
            onClick={() => {
              handleFilter("OnSale");
              setActiveId(1);
            }}
            active={activeId == 1 ? true : false}
          >
            在售 {activeId == 1 ? tagSize : ""}
          </Tag>
          <Tag
            size="normal"
            onClick={() => {
              handleFilter("Sold");
              setActiveId(2);
            }}
            active={activeId == 2 ? true : false}
          >
            已售 {activeId == 2 ? tagSize : ""}
          </Tag>
        </View>
        <View
          className={s.archive}
          onClick={() => {
            handleFilter("Unpublished");
            setActiveId(4);
          }}
        >
          <Text>下架商品</Text>
        </View>
      </View>
      <GoodsList
        showLoading={myItemList.isLoading}
        showPlaceholder
        isFavouritesPage={false}
        itemList={itemList}
        isSelf={isSelf}
      ></GoodsList>
    </View>
  );
};

export default Index;
