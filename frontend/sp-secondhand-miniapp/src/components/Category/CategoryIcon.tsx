import React from "react";
import s from "./CategoryIcon.css";
import { ITouchEvent, View, Image, CoverImage, CoverView } from "@tarojs/components";

interface Props {
  imgUrl: any;
  name: string;
  isActive: boolean;
  id: number;
  onClick?: (event?: ITouchEvent<any>) => void;
  isCover?: boolean;
}

const CategoryIcon: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
        {!props.isCover ? <View className={s.item}>
      <View
        id={props.id.toString()}
        onClick={props.onClick}
        className={` ${s.category} ${props.isActive && s.active} `}
      >
        <Image className={s.icon} src={props.imgUrl} />
        {props.name}
      </View>
    </View> :<CoverView className={s.item}>
      <CoverView
        id={props.id.toString()}
        onClick={props.onClick}
        className={` ${s.category} ${props.isActive && s.active} `}
      >
        <CoverImage className={s.icon} src={props.imgUrl} />
        {props.name}
      </CoverView>
    </CoverView>}
    </React.Fragment>
  );
};
export default CategoryIcon;
