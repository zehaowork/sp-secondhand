import React from "react";
import s from "./Modal.css";
import { View, Button, ITouchEvent } from "@tarojs/components";
import InlineLoader from "../InlineLoader/InlineLoader";

interface Props {
  isOpen: boolean;
  title: string;
  confirmText?: string;
  cancelText?: string;
  showLoading?: boolean;
  onConfirm: (event?: ITouchEvent<any>) => void;
  onCancel: (event?: ITouchEvent<any>) => void;
}

const Modal: React.FC<Props> = (props) => {
  return props.isOpen ? (
    <React.Fragment>
      <View onClick={props.onCancel} className={s.mask} />
      <View className={s.window}>
        <View className={s.title}>{props.title}</View>
        <View className={s.content}>{props.children}</View>
        <View className={s.button_set}>
          <Button onClick={props.onCancel} className={s.button}>
            {props.cancelText ? props.cancelText : "取消"}
          </Button>
          <Button onClick={props.onConfirm} className={s.button}>
           { props.showLoading ? <InlineLoader showLoading message="登录中..." /> : props.confirmText ? props.confirmText : "确认"}
          </Button>
        </View>
      </View>
    </React.Fragment>
  ) : null;
};
export default Modal;
