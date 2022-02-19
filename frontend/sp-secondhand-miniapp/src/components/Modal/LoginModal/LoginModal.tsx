import Taro from "@tarojs/taro";
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { View, ITouchEvent } from "@tarojs/components";
import s from "./LoginModal.css";
import Modal from "../Modal";
import API from "../../../../utils/API";
import { User } from "src/typings/common";
import { SAVE_USER_INFO } from "../../../actions/user";

interface Props {
  isOpen: boolean;
  onCancel: (event?: ITouchEvent<any>) => void;
}

const LoginModal: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);

  const onConfirm = () => {
    setShowLoading(true);
    authorize();
  };

  const authorize = () => {
    const userInfo = getUserInfo();
    const openID = getOpenId();

    Promise.all([userInfo, openID])
      .then((authDetails) => {
        API.User.signUp({
          openId: authDetails[1],
          userName: authDetails[0].userInfo.nickName,
          profileImgUrl: authDetails[0].userInfo.avatarUrl,
          gender: authDetails[0].userInfo.gender,
          city: authDetails[0].userInfo.city,
        } as User).then((res) => {
          if (res.statusCode === 200) {
            saveInfo(res.data.data as User);
          }
        });
      })
      .catch((err) => {
      });
  };

  //获取用户资料
  const getUserInfo = () => {
    return Taro.getUserProfile({
      desc: "用于完善会员资料",
    })
      .then((profile) => {
        if (profile.errMsg === "getUserProfile:ok")
          return Promise.resolve(profile);
      })
      .catch(() => {
        return Promise.reject("授权失败");
      });
  };

  //获取用户微信 openCode
  const getCode = () => {
    return Taro.login()
      .then((res) => {
        if (res.code) {
          return Promise.resolve(res.code);
        } else {
          return Promise.reject("授权失败");
        }
      })
      .catch(() => {
        return Promise.reject("授权失败");
      });
  };

  const getOpenId = () => {
    return getCode()
      .then((code) => {
        return API.User.getOpenId(code)
          .then((res) => {
            return Promise.resolve(res.data.data);
          })
          .catch(() => {
            return Promise.reject("获取OpenID失败");
          });
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const saveInfo = (user: User) => {
    Taro.setStorage({
      key: "userInfo",
      data: JSON.stringify(user),
    })
      .then(() => {
        dispatch(SAVE_USER_INFO(user));
      })
      .catch(() => {})
      .finally(() => {
        props.onCancel();
        setShowLoading(false);
      });
  };

  return (
    <Modal
      isOpen={props.isOpen}
      title="🥔 欢迎，加入小土豆"
      confirmText="登录"
      cancelText="取消"
      onConfirm={onConfirm}
      onCancel={props.onCancel}
      showLoading={showLoading}
    >
      <View className={s.body}>是否同意授权？</View>
    </Modal>
  );
};
export default LoginModal;
