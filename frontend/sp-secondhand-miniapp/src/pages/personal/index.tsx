import { OpenData, View, Image } from "@tarojs/components";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Taro,{useDidShow} from "@tarojs/taro";
import s from "./index.css";

//组件资源
import Avatar from "../../components/Avatar/Avatar";
import SystemButton from "../../components/SystemButton/SystemButton";
import { AtIcon } from "taro-ui";

//图片资源
import AboutIcon from "../../images/about.png";
import ShopIcon from "../../images/shop.png";
import MessageIcon from "../../images/message.png";
import ShareColorIcon from "../../images/share_color.png";
import CustomerServiceIcon from "../../images/customer_service.png";
import FavoritesIcon from "../../images/favorites_folder.svg";
import LoginModal from "../../components/Modal/LoginModal/LoginModal";
import { User } from "src/typings/common";
import { changeIndex } from "../../actions/tab-bar";

interface Props {}

const Index: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user: User | undefined = useSelector(({ user }) => user.user);



  useDidShow(() => dispatch(changeIndex(3)));
  

  const onModalCancel = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    if (user) return;
    setIsModalOpen(true);
  };

  const toShop = () => {
    if (!user) {
      openModal();
      return;
    } else {
      Taro.navigateTo({
        url: "/pages/shop/index?id=" + user.id,
      });
    }
  };

  const toFavorites = () => {
    if (!user) {
      openModal();
      return;
    } else {
      Taro.navigateTo({
        url: "/pages/favorites/index?id=" + user.id,
      });
    }
  };

  return (
    <View className={s.container}>
      {/* 登录弹窗 */}
      <LoginModal isOpen={isModalOpen} onCancel={onModalCancel} />

      {/* 用户基本信息 */}
      <View onClick={openModal} className={s.header}>
        <View className={s.content}>
          <View className={s.user}>
            <Avatar size="lg" isAuthorized={user !== undefined} />
            <View className={s.name}>
              {user !== undefined ? (
                <OpenData type="userNickName"></OpenData>
              ) : (
                "点击登录"
              )}
            </View>
          </View>
        </View>
      </View>

      {/* 用户子界面列表 */}
      <View className={s.list}>
        <View className={s.item} onClick={toShop}>
          <Image src={ShopIcon} className={s.icon} />
          我的店铺
          <View className={s.redirect}>
            {" "}
            <AtIcon
              value="chevron-right"
              size="25"
              color="#D2D2D2"
            ></AtIcon>{" "}
          </View>
        </View>
        <View className={s.item} onClick={toFavorites}>
          <Image src={FavoritesIcon} className={s.icon} />
          收藏夹
          <View className={s.redirect}>
            {" "}
            <AtIcon
              value="chevron-right"
              size="25"
              color="#D2D2D2"
            ></AtIcon>{" "}
          </View>
        </View>
        <View className={s.item}>
          <Image src={AboutIcon} className={s.icon} />
          关于我们
          <View className={s.redirect}>
            {" "}
            <AtIcon
              value="chevron-right"
              size="25"
              color="#D2D2D2"
            ></AtIcon>{" "}
          </View>
        </View>
      </View>

      <SystemButton
        type="share"
        color="ORANGE"
        text="分享小程序"
        src={ShareColorIcon}
      />
      <SystemButton
        type="contact"
        color="GREEN"
        text="联系客服"
        src={CustomerServiceIcon}
      />
    </View>
  );
};
export default Index;
