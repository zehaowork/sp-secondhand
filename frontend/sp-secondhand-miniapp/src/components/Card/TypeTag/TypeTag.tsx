import React from "react";
import { View } from "@tarojs/components";
import s from "./TypeTag.css";
import {GOOD_CONDITION} from '../../../typings/enum'
import { Utils } from "../../../../utils/Utils";

interface Props {
  condition: string;
}

const TypeTag: React.FC<Props> = (props) => {
  return (
    <View
      className={
        props.condition === GOOD_CONDITION.BRAND_NEW
          ? s.new
          : props.condition === GOOD_CONDITION.LIKE_NEW
          ? s.used
          : s.shop
      }
    >
      {Utils.convertGoodConditionToChinese(props.condition)}
    </View>
  );
};
export default TypeTag;
