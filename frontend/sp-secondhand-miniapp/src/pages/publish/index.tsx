import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Picker,
  Input,
  Form,
  Textarea,
  Button,
  Image,
} from "@tarojs/components";
import s from "./index.css";
import { AtImagePicker, AtTag } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { City } from "src/typings/common";
import { getCityList } from "../../actions/cities";
import API from "../../../utils/API";

import PriceSymbol from '../../images/price-symbol.png';
import CategorySymbol from '../../images/categories.png';
import StatusSymbol from '../../images/status.png';
import CitySymbol from '../../images/city.png';
import AddressSymbol from '../../images/place-marker.png';
import ContactSymbol from '../../images/contacts.png';
import WechatIcon from '../../images/weixin.png';
import TelIcon from '../../images/phone.png';


enum Conditions {
  BrandNew = "全新",
  LikeNew = "几乎全新",
  MinorFlaw = "轻微划痕",
  ObviousFlaw = "明显划痕",
}

export interface secondHandData {
  description: string | undefined;
  title: string | undefined;
  price: number | undefined;
  imgUrls: Array<String>;
  address: string | undefined;
  telephone: string | undefined;
  weChatId: string | undefined;
  categoryId: number | undefined;
  cityId: number | undefined;
  condition: string | undefined;
  userId: number | undefined;
}

interface Props {}

const Index: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<secondHandData>({
  title: undefined,
  imgUrls: [],
  description: undefined,
  weChatId: undefined,
  telephone: undefined,
  price: undefined,
  condition: undefined,
  address: undefined,
  userId: undefined,
  categoryId: undefined,
  cityId: undefined,
  });

  const [images, setImages] = useState([]);

  const categories = useSelector(({ categoryList }) => categoryList);
  const catList = categories.categoryList.filter((cat) => cat.name != "全部");
  const cities = useSelector(({ cityList }) => cityList).cityList;

  useEffect(() => {
    if ((cities as City[]).length === 0) {
      dispatch(getCityList());
    }
  }, []);

  const handleDescription = (e) => {
    setState({ ...state, description: e.detail.value });
  };

  const handleTitle = (e) => {
    setState({ ...state, title: e.detail.value });
  };
  const handlePrice = (e) => {
    setState({ ...state, price: e.detail.value });
  };

  const handleAddress = (e) => {
    setState({ ...state, address: e.detail.value });
  };

  const onFail = (mes) => {
    console.log(mes);
  };

  // need fixing
  const setImage = (imagePath, operationType, index) => {
    if(operationType === 'add'){
      // find images added by comparing arrays
      const photosAdded = imagePath.slice(images.length);
      setImages(imagePath);
      var addIndex = images.length;
      for (const image of photosAdded) {
        API.SecondHand.uploadImage(image.url, {
          uid: 4,
          i: addIndex
        })
        .then((res) => {
          setState({...state, imgUrls: state.imgUrls.concat(JSON.parse(res.data).data[0].imgUrl)})
          addIndex += 1;
        })
      }
    } else if (operationType === 'remove'){
      setState({...state, imgUrls: state.imgUrls.splice(index)})
      setImages(imagePath)
    }
  };

  const handleCategory = (e) => {
    setState({
      ...state,
      categoryId: catList[e.detail.value].id,
    });
  };

  const handleCity = (e) => {
    setState({
      ...state,
      cityId: cities[e.detail.value].id,
    });
  };

  function getEnumKeyByEnumValue(myEnum, enumValue) {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : undefined;
}

  const handleCondition = (conditionValue) => {
    let conditionKey = getEnumKeyByEnumValue(Conditions, conditionValue);
    setState({ ...state, condition: conditionKey });
  };

  const handleTelephone = (e) => {
    setState({ ...state, telephone: e.detail.value });
  };

  const handleWechat = (e) => {
    setState({ ...state, weChatId: e.detail.value });
  };

  const onSubmit = () => {
    console.log("SUBMITTING");
    console.log(state);
    // API.SecondHand.postSecondHand(state)
    //   .then((res) => {
    //     if (res.statusCode === 200) {
    //       console.log(res.data.data);
    //     }
    //   })
    //   .catch((err) => {});
  };

  return (
    <View className={s.container}>
      <Form className={s.form_style}>
        <View style={"padding: 20rpx;"}>
          <Text style={"font-size:32rpx"}>商品标题</Text>
          <Input
            className={s.input_text}
            type="text"
            placeholder="标题"
            maxlength={20}
            onInput={handleTitle.bind(this)}
          />
        </View>

        <View style={"border-top: 1rpx solid #e8e8e8;"}></View>

        <View style={"padding: 20rpx;"}>
          <Text style={"font-size:32rpx"}>商品描述</Text>
          <Textarea
            style="min-height:80px; width:100%"
            className={s.input_text}
            autoHeight
            showConfirmBar={false}
            placeholder="商品型号等"
            maxlength={200}
            onInput={handleDescription.bind(this)}
          />
          <View className={s.counter}>
            {state.description == undefined ? 0 : state.description.length}/200
          </View>
        </View>

        <AtImagePicker
          multiple
          count={8}
          sizeType={['compressed']}
          files={images}
          onFail={onFail}
          onChange={setImage}
        />

        <View className={s.input_item}>
          <View style={"width: 100%; font-size:32rpx"}> 
            <Image src={PriceSymbol} className={s.icon} /> 
          价格</View>
          <Input
            className={s.input_style}
            type="digit"
            placeholder="请输入价格, 最多保留一位小数点"
            onInput={handlePrice.bind(this)}
          />
        </View>

        <View className={s.input_item}>
        <View style={"width: 100%; font-size:32rpx"}> 
            <Image src={CategorySymbol} className={s.icon} /> 
            商品类型</View>
          <Picker
            className={s.input_style}
            mode="selector"
            range={catList}
            rangeKey={"name"}
            onChange={handleCategory.bind(this)}
          >
            <View style={"color:#666"}>
              {state.categoryId == undefined
                ? "请选择类型"
                : catList.find(c => c.id == state.categoryId).name}
            </View>
          </Picker>
        </View>

        <View className={s.input_item}>
        <View style={"width: 100%; font-size:32rpx"}> 
            <Image src={StatusSymbol} className={s.icon} /> 
            商品状态</View>
          <View>
            {Object.values(Conditions).map((c) => (
              <AtTag
                type="primary"
                circle
                onClick={() => handleCondition(c)}
                active={state.condition == getEnumKeyByEnumValue(Conditions, c) ? true : false}
              >
                {c}
              </AtTag>
            ))}
          </View>
        </View>

        <View className={s.input_item}>
        <View style={"width: 100%; font-size:32rpx"}> 
            <Image src={CitySymbol} className={s.icon} /> 
            城市</View>
          <Picker
            className={s.input_style}
            mode="selector"
            range={cities}
            rangeKey={"name"}
            onChange={handleCity.bind(this)}
          >
            <View style={"color:#666"}>
              {state.cityId == undefined ? "请选择城市" : cities.find(c => c.id === state.cityId).name}
            </View>
          </Picker>
        </View>

        <View className={s.input_item}>
        <View style={"width: 100%; font-size:32rpx"}> 
            <Image src={AddressSymbol} className={s.icon} /> 
            地址</View>
          <Input
            className={s.input_style}
            type="text"
            placeholder="请输入交易地址"
            onInput={handleAddress.bind(this)}
          />
        </View>

        <View className={s.input_item}>
        <View style={"font-size:32rpx"}> 
            <Image src={ContactSymbol} className={s.icon} /> 
            联系方式 （手机和微信至少填写一个）</View>
        </View>

        <View style={"border-top: 1rpx solid #e8e8e8;"}></View>

        <View style={"padding: 20rpx; display: inline-flex;"}>
        <Image src={WechatIcon} className={s.icon_inline} /> 
          <Input
            style="width:100%;"
            className={s.input_text}
            type="number"
            placeholder="你的手机号"
            onInput={handleWechat.bind(this)}
          />
        </View>

        <View style={"border-top: 1rpx solid #e8e8e8;"}></View>
        <View style={"padding: 20rpx; display: inline-flex;"}>
        <Image src={TelIcon} className={s.icon_inline} /> 
          <Input
            style="width:100%;"
            className={s.input_text}
            type="text"
            placeholder="你的微信号"
            onInput={handleTelephone.bind(this)}
          />
        </View>

        <View style={"border-top: 1rpx solid #e8e8e8;"}></View>

        <View style={"margin:10rpx"}>
          <Text style={"color:red"}>
            点击发布等于统一条款，如违规发布商品，会由管理员封号，风险自负
          </Text>
          <Text>详情请阅读《小土豆闲置条款》</Text>
        </View>
        <View style={"border-top: 1rpx solid #e8e8e8; padding: 20rpx"}></View>

        <Button style={"margin: 0 20%;background: #F99852;border-radius: 46rpx;color: white;"}
      onClick={onSubmit.bind(this)}
    >提交</Button>
      </Form>
      <View style={"padding: 70rpx"}></View>
    </View>
  );
};

export default Index;
