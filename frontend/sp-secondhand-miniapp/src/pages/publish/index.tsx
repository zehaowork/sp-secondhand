import React, { useEffect, useState } from "react";
import { View, Text, Picker } from "@tarojs/components";
import s from "./index.css";
import {
  AtForm,
  AtTextarea,
  AtDivider,
  AtInput,
  AtImagePicker,
  AtTag,
  AtList,
  AtListItem,
  AtButton,
} from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { Category, City } from "src/typings/common";
import { getCityList } from "../../actions/cities";

interface Props {}

const Index: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState();

  const categories = useSelector(({ categoryList }) => categoryList);
  const [category, setCategory] = useState<Category>();
  const cities = useSelector(({ cityList }) => cityList).cityList;
  const [city, setCity] = useState<City>();
  const conditionList = ["全新", "几乎全新", "轻微划痕", "明显划痕"];
  const [condition, setCondition] = useState("");

  useEffect(() => {
    if((cities as City[]).length === 0){
      dispatch(getCityList());
    }
}, [])

  const handleDescription = (value: string) => {
    setDescription(value);
  };

  const handleTitle = (string) => {
    setTitle(string);
  };
  const handlePrice = (value) => {
    setPrice(value);
  };

  const handleAddress = (string) => {
    setAddress(string);
  };

  const onFail = (mes) => {
    console.log(mes);
  };

  const setImage = (image) => {
    setImages(images.concat(image));
  };

  const handleCategory = (e) => {
    setCategory(categories.categoryList[e.detail.value]);
  };

  const handleCity = (e) => {
    setCity(cities[e.detail.value]);
  };

  const handleCondition = (condition) => {
    setCondition(condition);
  };

  // todo
  const onSubmit = (event) => {
    console.log(event);
    console.log("SUBMITTING");
  };

  return (
    <View>
      <AtForm onSubmit={onSubmit.bind(this)}>
        <AtInput
          name="title"
          title="商品标题"
          type="text"
          maxlength={20}
          placeholder="标题"
          value={title}
          onChange={handleTitle.bind(this)}
        />

        <AtDivider height={10} />

        <Text style={"margin-left:32rpx; font-size:32rpx"}>商品描述</Text>
        <AtTextarea
          value={description}
          onChange={handleDescription}
          maxLength={200}
          height={150}
          placeholder="商品型号等"
          textOverflowForbidden={false}
          customStyle={"padding-left:32rpx; border:0"}
        />
        <AtImagePicker
          multiple
          files={images}
          onFail={onFail}
          onChange={setImage}
        />

        <AtDivider height={10} />

        <AtInput
          name="price"
          title="价格"
          type="number"
          border={false}
          placeholder="请输入价格, 最多保留一位小数点"
          value={price}
          onChange={handlePrice.bind(this)}
          style={"padding: 20rpx 0"}
        />
        {/* <AtDivider height={10} /> */}

        <Picker
          mode="selector"
          range={categories.categoryList}
          rangeKey={"name"}
          onChange={handleCategory.bind(this)}
          style={"padding-left:8rpx"}
        >
          <AtList>
            <AtListItem
              title="商品类型"
              extraText={
                category?.name == undefined ? "请选择类型" : category.name
              }
            />
          </AtList>
        </Picker>

        <View
          style={
            "padding: 20rpx 0 20rpx 32rpx; font-size: 32rpx; line-height: 1.5"
          }
        >
          商品状态
          {conditionList.map((c) => (
            <AtTag
              type="primary"
              circle
              onClick={() => handleCondition(c)}
              active={condition == c ? true : false}
            >
              {c}
            </AtTag>
          ))}
        </View>

        <Picker
          mode="selector"
          range={cities}
          rangeKey={"name"}
          onChange={handleCity.bind(this)}
          style={"padding-left:8rpx"}
        >
          <AtList>
            <AtListItem 
              title="城市" 
              extraText={
                city?.name == undefined ? "请选择城市" : city.name
              }
            />
          </AtList>
        </Picker>

        <AtInput
          name="address"
          title="地址"
          type="text"
          border={false}
          placeholder="请输入交易地址"
          value={address}
          onChange={handleAddress.bind(this)}
        />

        {/* todo: binding */}
        <Text style={"margin-left:24rpx; font-size:32rpx"}>
           联系方式 （手机和微信至少填写一个）
        </Text>
        <AtInput
          name=""
          type="number"
          border={false}
          placeholder="你的手机号"
          value={address}
          onChange={handleAddress.bind(this)}
        />
        <AtInput
          name=""
          type="text"
          border={false}
          placeholder="你的微信号"
          value={address}
          onChange={handleAddress.bind(this)}
        />
        <View style={"padding-left:32rpx"}>
          <Text style={"color:red"}>
            点击发布等于统一条款，如违规发布商品，会由管理员封号，风险自负
          </Text>
          <Text>详情请阅读《小土豆闲置条款》</Text>
        </View>

        <AtButton circle loading={false} type="primary" formType="submit">
          提交
        </AtButton>
      </AtForm>
      <View style={"padding: 70rpx"}></View>
    </View>
  );
};

export default Index;
