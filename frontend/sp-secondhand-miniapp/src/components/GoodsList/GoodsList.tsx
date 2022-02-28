import React from "react";
import { View, Image, ITouchEvent } from "@tarojs/components";
import { Item } from "src/typings/common";
import s from "./GoodsList.css";
import Card from "../Card/Card";
import EmptyListIcon from "../../images/box3.png";

interface Props {
  isFavouritesPage?: boolean;
  editable?: boolean;
  onEdit?: (event?: ITouchEvent<any>) => void;
  itemList: Array<Item>;
  keyword?: string;
  showPlaceholder?: boolean;
  showLoading: boolean;
}

//容器组件
const GoodsList: React.FC<Props> = (props) => {
  const renderList = props.itemList.map((item: Item) => {
    return (
      <Card
        keyword={props.keyword}
        key={item.id}
        item={item}
        isFavouritesPage={props.isFavouritesPage}
        editable={props.editable}
        onEdit={props.onEdit ? props.onEdit : undefined}
      />
    );
  });

  return (
    <View className={s.container}>
      {/* 列表 */}
      {props.itemList.length ? (
        <View className={s.list}>{renderList}</View>
      ) : (
        props.showPlaceholder &&
        !props.showLoading && (
          <Image className={s.img} src={EmptyListIcon}></Image>
        )
      )}
    </View>
  );
};
export default GoodsList;
