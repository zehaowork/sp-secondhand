import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Picker,
  Input,
  Textarea,
  Button,
  Image,
} from "@tarojs/components";
import s from "./index.css";
import Taro, { useDidShow } from "@tarojs/taro";
import { AtImagePicker } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { City } from "src/typings/common";
import { getCityList } from "../../actions/city";
import { getCategoryList } from "../../actions/category";
import { changeIndex } from "../../actions/tab-bar";
import API from "../../../utils/API";

import PriceSymbol from "../../images/price-symbol.png";
import CategorySymbol from "../../images/categories.png";
import StatusSymbol from "../../images/status.png";
import CitySymbol from "../../images/city.png";
import AddressSymbol from "../../images/place-marker.png";
import ContactSymbol from "../../images/contacts.png";
import WechatIcon from "../../images/weixin.png";
import TelIcon from "../../images/phone.png";
import Tag from "../../components/Tag/Tag";

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

  const categories = useSelector(({ category }) => category.categoryList);
  const catList = categories.filter((cat) => cat.name != "全部");
  const cities: City[] = useSelector(({ city }) => city.cityList);

  useEffect(() => {
    if (cities.length === 0) {
      dispatch(getCityList());
    }
    if (categories.length === 0) {
      dispatch(getCategoryList());
    }
  }, []);

  useDidShow(() => dispatch(changeIndex(1)));

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

  const setImage = (imagePath, operationType, index) => {
    if (operationType === "add") {
      // find images added by comparing arrays
      const photosAdded = imagePath.slice(images.length);
      setImages(imagePath);
      var addIndex = images.length;
      for (const image of photosAdded) {
        API.SecondHand.uploadImage(image.url, {
          uid: 4,
          i: addIndex,
        }).then((res) => {
          setState({
            ...state,
            imgUrls: state.imgUrls.concat(JSON.parse(res.data).data[0].imgUrl),
          });
          addIndex += 1;
        });
      }
    } else if (operationType === "remove") {
      setState({ ...state, imgUrls: state.imgUrls.splice(index) });
      setImages(imagePath);
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
    let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
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
      {/* <Form className={s.form_style}> */}
      <View className={s.section_padding}>
        <Text style={"font-size:16px"}>商品标题</Text>
        <Input
          className={s.input_style}
          type="text"
          placeholder="标题"
          maxlength={20}
          onInput={handleTitle.bind(this)}
        />
      </View>

      <View className={s.separator}></View>

      <View className={s.section_padding}>
        <Text style={"font-size:16px"}>商品描述</Text>
        <Textarea
          className={s.input_style}
          style="min-height:80px; width:100%"
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
        sizeType={["compressed"]}
        files={images}
        onFail={onFail}
        onChange={setImage}
      />

      <View className={s.input_item}>
        <View className={s.input_index}>
          <Image src={PriceSymbol} className={s.icon} />
          价格
        </View>
        <Input
          className={s.input_style}
          type="digit"
          placeholder="请输入价格, 最多保留一位小数点"
          onInput={handlePrice.bind(this)}
        />
      </View>

      <View className={s.input_item}>
        <View className={s.input_index}>
          <Image src={CategorySymbol} className={s.icon} />
          商品类型
        </View>
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
              : catList.find((c) => c.id == state.categoryId).name}
          </View>
        </Picker>
      </View>

      <View className={s.input_item}>
        <View className={s.input_index}>
          <Image src={StatusSymbol} className={s.icon} />
          商品状态
        </View>
        <View className={s.status_container}>
          {Object.values(Conditions).map((c) => (
            <Tag
              size="normal"
              circle
              name={c}
              onClick={() => handleCondition(c)}
              active={
                state.condition == getEnumKeyByEnumValue(Conditions, c)
                  ? true
                  : false
              }
            />
          ))}
        </View>
      </View>

      <View className={s.input_item}>
        <View className={s.input_index}>
          <Image src={CitySymbol} className={s.icon} />
          城市
        </View>
        <Picker
          className={s.input_style}
          mode="selector"
          range={cities}
          rangeKey={"name"}
          onChange={handleCity.bind(this)}
        >
          <View style={"color:#666"}>
            {state.cityId == undefined
              ? "请选择城市"
              : cities.find((c) => c.id === state.cityId)?.name}
          </View>
        </Picker>
      </View>

      <View className={s.input_item}>
        <View className={s.input_index}>
          <Image src={AddressSymbol} className={s.icon} />
          地址
        </View>
        <Input
          className={s.input_style}
          type="text"
          placeholder="请输入交易地址"
          onInput={handleAddress.bind(this)}
        />
      </View>

      <View className={s.input_item}>
        <View className={s.input_index}>
          <Image src={ContactSymbol} className={s.icon} />
          联系方式 （手机和微信至少填写一个）
        </View>
      </View>

      <View className={s.separator}></View>

      <View className={s.input_inline}>
        <Image src={WechatIcon} className={s.icon_inline} />
        <Input
          style="width:100%;"
          className={s.input_style}
          type="number"
          placeholder="你的手机号"
          onInput={handleWechat.bind(this)}
        />
      </View>

      <View className={s.separator}></View>

      <View className={s.input_inline}>
        <Image src={TelIcon} className={s.icon_inline} />
        <Input
          style="width:100%;"
          className={s.input_style}
          type="text"
          placeholder="你的微信号"
          onInput={handleTelephone.bind(this)}
        />
      </View>

      <View className={s.separator}></View>

      <View style={"margin:5px;"}>
        <Text style={"color:red"}>
          点击发布等于统一条款，如违规发布商品，会由管理员封号，风险自负
        </Text>
        <Text>详情请阅读《小土豆闲置条款》</Text>
      </View>

      <View className={s.separator}></View>

      {/* to have enough space for buttom display */}
      <View style={"padding: 10px 0 100px 0"}>
        <Button className={s.buttom_style} onClick={onSubmit.bind(this)}>
          提交
        </Button>
      </View>
      {/* </Form> */}
    </View>
  );
};

export default Index;
