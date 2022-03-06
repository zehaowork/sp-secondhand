import React, { useEffect, useState } from "react";
import {
  View,
  Form,
  Text,
  Input,
  Textarea,
  Picker,
  Image,
  Button,
} from "@tarojs/components";
import s from "./index.css";
import { AtImagePicker, AtCalendar } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { City } from "src/typings/common";
import { getCityList } from "../../actions/city";
import API from "../../../utils/API";
import Tag from "../../components/Tag/Tag";
import Calendar from "taro-calendar-picker";
import 'taro-calendar-picker/dist/index.css';
import moment from 'moment';


import WechatIcon from "../../images/weixin.png";
import TelIcon from "../../images/phone.png";

enum RoomType {
  Studio = "Studio",
  SharedFlat = "SharedFlat",
  SharedRoom = "SharedRoom",
  SharedHouse = "SharedHouse",
}

export interface propertyData {
  description: string | undefined;
  title: string | undefined;
  price: number | undefined;
  imgUrls: Array<String>;
  postcode: string | undefined;
  telephone: string | undefined;
  weChatId: string | undefined;
  roomType: string | undefined;
  space: number | undefined;
  utilities: Array<String>;
  userId: number | undefined;
  cityId: number | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
}

interface Props {}

const Index: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<propertyData>({
    title: undefined,
    imgUrls: [],
    description: undefined,
    weChatId: undefined,
    telephone: undefined,
    price: undefined,
    roomType: undefined,
    postcode: undefined,
    userId: undefined,
    space: undefined,
    cityId: undefined,
    utilities: [],
    startDate: undefined,
    endDate: undefined,
  });

  const cities: City[] = useSelector(({ city }) => city.cityList);
  const [images, setImages] = useState([]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setInterval(() => {
      // setVisible(Math.round(Math.random()) === 0);
    }, 2000)
    if (cities.length === 0) {
      dispatch(getCityList());
    }
  }, []);

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

  const handleTitle = (e) => {
    setState({ ...state, title: e.detail.value });
  };

  const handleDescription = (e) => {
    setState({ ...state, description: e.detail.value });
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

  const handleCalendar = (e) => {
    setState({
      ...state,
      startDate: e.detail.value.startDate,
      endDate: e.detail.value.endDate,
    });
  };

  const handlePrice = (e) => {
    setState({ ...state, price: e.detail.value });
  };

  const handleCity = (e) => {
    setState({
      ...state,
      cityId: cities[e.detail.value].id,
    });
  };

  const handlePostcode = (e) => {
    setState({ ...state, postcode: e.detail.value });
  };

  const handleSpace = (e) => {
    setState({ ...state, space: e.detail.value });
  };

  const handleTelephone = (e) => {
    setState({ ...state, telephone: e.detail.value });
  };

  const handleWechat = (e) => {
    setState({ ...state, weChatId: e.detail.value });
  };

  return (
    <View className={s.container}>
      <Form>
        <View style={"padding: 20rpx;"}>
          <Text style={"font-size:32rpx"}>房源标题</Text>
          <Input
            className={s.input_text}
            type="text"
            placeholder="标题"
            maxlength={20}
            onInput={handleTitle}
          />
        </View>
        <View style={"border-top: 1rpx solid #e8e8e8;"}></View>
        <View style={"padding: 20rpx;"}>
          <Text style={"font-size:32rpx"}>房源描述</Text>
          <Textarea
            style="min-height:80px; width:100%"
            className={s.input_text}
            autoHeight
            showConfirmBar={false}
            placeholder="房源信息等"
            maxlength={200}
            onInput={handleDescription}
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
          onFail={() => {
            console.log(this);
          }}
          onChange={setImage}
        />

        <View style={"border-top: 1rpx solid #e8e8e8;"}></View>

        <View style={"padding: 10px; font-size:16px"}>
          <View style={"padding-bottom: 8px"}>转租详情</View>

          <View className={s.input_item}>
            <Text style={"width: 100%"}>转租日期</Text>
            <Calendar
            weekFlag="Sun"
      data={["Hour", "Day", "Week", "Month", "Year"]} // 时间/日期/周/月
      activeTab="Day" // 默认类型；支持： Hour/Day/Week/Month
      multiple={true} // 是否多选；目前只对 Day/Week/Month 有效
      lastDay={true} //  是否展示(last day Last 7Days Last 30Days) 目前只对day页面有效
      value={[moment(), moment()]} // 已选值 时间/日期/月/周
      visible={visible} // 设置是否展示弹窗：visible 更改会直接影响是否弹窗；visbile不更改时，弹窗可以根据操作展示或者关闭；可以从 onVisibleChange 获取最新的弹窗状态
      onVisibleChange={(visible) => { // 日期插件弹窗与关闭的事件；visible为true表示是弹窗的
        console.log(visible)
      }}
      maskClosable={true} // 遮罩层是否可点击关闭；默认是 true
      isNeedLeastOne={false} //用于控制月、周、日是否开启至少选择一项的功能,默认是false
      defaultVisible={false} // 默认是否弹窗；默认是 false
      mask={true} // 是否展示遮罩层；默认是 true
      disables={() => { // 禁止日期处理 返回两个参数，第一个参数date是日期，第二个参数是type指的是tab标签的类型，有以下几个值：Day Week Month Quarter Year
        return (date, type) => {
          console.log(type)
          return date.isAfter('2021-8-01')
        }
        // return false;
      }}
      open={
        <Button style={{ marginTop: "10px" }}>筛选器</Button>
      }
      onChange={(value, allSelectedValue, type) => { // value: 当前选择值；type：类型，对应 [Hour|Day|Week|Month]；allSenpmlectedValue 所有类型已选中的值
          alert(value)
      }}
      tabChange={(currentTab, preTab) => { // currentTab: 切换之后的tab值;preTab: 切换之前的tab值
         console.log(currrentTab, preTab)
      }}
      singleClose={false} // 单选立即关闭,默认值为false
      multipleClose={true} // 多选立即关闭，默认值为false
      isShowConfirm={true} // confirm按钮是否展示，默认为true
      afterTabChange={()=>{ //tab切换之后，进入到页面中后触发的回调函数
        console.log('afterTabChange')
      }}
       hourMode={false}//自定义选择时间范围:true, 自动选择开始时间是当前选中时间前24小时:false    默认值为false
    
            />
            {/* <AtCalendar 
            isMultiSelect 
            currentDate={{start: '', end: ''}}
            onSelectDate={handleCalendar}
            /> */}
            <Input
              className={s.input_style}
              type="digit"
              placeholder="请选择转租日期"
              // onInput={handlePrice.bind(this)}
            />
          </View>

          <View className={s.input_item}>
            <Text style={"width: 100%"}>租金 /周</Text>
            <Input
              className={s.input_style}
              type="digit"
              placeholder="请输入价格"
              onInput={handlePrice}
            />
          </View>

          <View className={s.input_item}>
            <View style={"width: 100%"}>城市</View>
            <Picker
              className={s.input_style}
              mode="selector"
              range={cities}
              rangeKey={"name"}
              onChange={handleCity}
            >
              <View style={"color:#666"}>
                {state.cityId == undefined
                  ? "请选择城市"
                  : cities.find((c) => c.id === state.cityId)?.name}
              </View>
            </Picker>
          </View>

          <View className={s.input_item}>
            <View style={"width: 100%"}>房源邮编</View>
            <Input
              className={s.input_style}
              type="text"
              placeholder="请输入房源邮编"
              maxlength={12}
              onInput={handlePostcode}
            />
          </View>
        </View>

        <View style={"border-top: 1rpx solid #e8e8e8;"}></View>

        <View style={"padding: 10px; font-size:16px"}>
          <View style={"padding-bottom:8px"}>房源详情</View>

          <View className={s.input_item}>
            <View style={"width: 100%"}>房型</View>
            <View className={s.status_container}>
              {Object.values(RoomType).map((c) => (
                <Tag
                  size="normal"
                  circle
                  name={c}
                  // onClick={() => handleCondition(c)}
                  // active={
                  //   state.condition == RoomType[c]
                  // }
                />
              ))}
            </View>
          </View>

          <View className={s.input_item}>
            <View style={"width: 100%"}>面积</View>
            <Input
              className={s.input_style}
              type="digit"
              placeholder="请输入面积"
              onInput={handleSpace}
            />
          </View>

          <View className={s.input_item}>
            <View style={"width: 100%"}>室内设施</View>
            <Input
              className={s.input_text}
              type="text"
              placeholder="tags"
              maxlength={12}
              // onInput={ } //handling function
            />
          </View>
        </View>


        <View className={s.input_item}>
          <View style={"font-size:32rpx"}>
            联系方式 （手机和微信至少填写一个）
          </View>
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

        <Button
          style={
            "margin: 0 20%;background: #F99852;border-radius: 46rpx;color: white;"
          }
          onClick={onSubmit.bind(this)}
        >
          提交
        </Button>
      </Form>
      <View style={"padding: 50px"}></View>
    </View>
  );
};

export default Index;
