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

enum FILTER_TYPE {
  ALL = "All", // 所有
  UNPUBLISHED = "Unpublished", // 下架
  ONSALE = "OnSale", // 在售
  SOLD = "Sold", // 已售
}

interface Props {}
const Index: React.FC<Props> = () => {
  const dispatch = useDispatch();
  let id: number | undefined;
  const [activeFilter, setActiveFilter] = useState<FILTER_TYPE>(
    FILTER_TYPE.ALL
  );
  const [editable, setEditable] = useState(false);
  const selfId: number = useSelector(({ user }) => user.user.id);

  const isLoading = useSelector(({ myItemList }) => myItemList.isLoading);
  const myItemList: Item[] = useSelector(
    ({ myItemList }) => myItemList.itemList
  ).filter((item) => {
    if (activeFilter === FILTER_TYPE.ALL)
      return item.status !== FILTER_TYPE.UNPUBLISHED;
    return item.status === activeFilter;
  });

  useEffect(() => {
    id = getCurrentInstance().router!.params.id as unknown as number;

    if (id) {
      dispatch(getMyItemList(id));
      setEditable(id == selfId);
    }
  }, []);

  usePullDownRefresh(() => {
    if (id) dispatch(getMyItemList(id));
  });

  return (
    <View className={s.container}>
      <View className={s.indicator}>
        <View className={s.tags}>
          <Tag
            size="normal"
            onClick={() => {
              setActiveFilter(FILTER_TYPE.ALL);
            }}
            active={activeFilter === FILTER_TYPE.ALL}
          >
            全部商品 {activeFilter === FILTER_TYPE.ALL && myItemList.length}
          </Tag>
          <Tag
            size="normal"
            onClick={() => {
              setActiveFilter(FILTER_TYPE.ONSALE);
            }}
            active={activeFilter == FILTER_TYPE.ONSALE}
          >
            在售 {activeFilter === FILTER_TYPE.ONSALE && myItemList.length}
          </Tag>
          <Tag
            size="normal"
            onClick={() => {
              setActiveFilter(FILTER_TYPE.SOLD);
            }}
            active={activeFilter === FILTER_TYPE.SOLD}
          >
            已售 {activeFilter === FILTER_TYPE.SOLD && myItemList.length}
          </Tag>
        </View>
        <View
          className={s.archive}
          onClick={() => {
            setActiveFilter(FILTER_TYPE.UNPUBLISHED);
          }}
        >
          <Text>下架商品</Text>
        </View>
      </View>
      <GoodsList
        showLoading={isLoading}
        showPlaceholder
        isFavouritesPage={false}
        itemList={myItemList}
        editable={editable}
        onEdit={() => {setActiveFilter(FILTER_TYPE.ALL)}}
      ></GoodsList>
    </View>
  );
};

export default Index;
