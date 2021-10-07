import React, { useEffect, useState, } from 'react'
import Taro from '@tarojs/taro';
import { View, Text, Image, ScrollView } from "@tarojs/components"
import s from './index.css'
import Avatar from '../../components/Avatar/Avatar'
import API from '../../../utils/API'
import { Item } from 'src/typings/common'
import { AtIcon } from 'taro-ui';
import WeixinIcon from '../../images/weixin.png';
import MobileIcon from '../../images/phone.png';
import MessageIcon from '../../images/chat.png';
import SellerShopIcon from '../../images/shop1.png';
import { Utils } from '../../../utils/Utils';


const Index: React.FC = () => {
  const [item, setItem] = useState<Item>(); //商品信息
  const $instance = Taro.getCurrentInstance(); //页面对象
  const itemId = $instance.router?.params.id === undefined ? '' : $instance.router?.params.id;
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [imgList, setImgList] = useState<String[]>();

  useEffect(() => {
    getItem();
  },[])

  const getItem = () => {
    API.SecondHand.getSecondHand(
      parseInt(itemId, 10)
    ).then(res => {
      if (res.statusCode === 200) {
        setItem(res.data.data)
        console.log(res.data.data)
        var imgs = res.data.data.imgUrls
        if(imgs != undefined && imgs != null){
          console.log(imgs)
          setImgList(imgs)
        }
      }
    }).catch(
      err => {
        console.log(err)
      }
    )
  }

  //TODO: use redux
  const toggleFavorite = ()=>{
    setIsFavorite(!isFavorite);
}

  //复制卖家联系方式
  const copyToClipboard = (contactDetail:string) => {
    Taro.setClipboardData({
      data: contactDetail,
      success: function (res) {
        Taro.showToast({
          title: '复制成功',
          icon: 'success',
        })
      }
    })
  }

  //TODO: 跳转到聊天室
  const toChatroom = () =>{
    Taro.navigateTo({
      url:'../chatboard/index'
    })
  }

  //TODO: 跳转到商家店铺
  const toShopPage = () =>{
    Taro.navigateTo({
      url:'../shop/index?id='+item?.userId
    })
  }

  const hideNumbers = (number:string) =>{
    var hiddenString='';
    for (var i = 0; i < number.length; i++) {
      hiddenString += '*'
    }
    return hiddenString;
  }

  const onScroll = (e) => {
    //convert rpx tp px
    var px = 166 / 750 * wx.getSystemInfoSync().windowWidth;
    console.log(e.detail.scrollTop)

    if(e.detail.scrollTop < px ) {
      setShowTopHeader(true)
    } else {
      setShowTopHeader(false)
    }
  }

  return <View className={s.container}>
    <ScrollView scrollY 
    onScroll={Utils.throttle(onScroll, 10)}>
    <View className={showTopHeader ? s.header : s.header_hide}>
      <View className={s.content}>
        <View className={s.user} >
        <Image src={item?.userProfileImgUrl != undefined? item?.userProfileImgUrl: ""} 
            className={s.avatar_lg} />
          <View className={s.infotag}>
            <View className={s.name} >
              {item?.userName}
            </View>
            {/* TODO: time formatter */}
            {item?.publishTime} 发布于 
            <Text style={{fontWeight:500}}> {item?.cityName}</Text>
          </View>
          <AtIcon className={s.heart} 
           value={isFavorite?'heart-2':'heart'} 
           size='25' 
           color={isFavorite?'#e54d42':'#aaaaaa'}
           onClick={toggleFavorite}
         />
        </View>
      </View>
    </View>

    <View className={s.thin_divider}></View>

    {/* 商品信息 */}
    <View className={s.body_details}>
      <View className={s.price}>£ {item?.price}</View>
      <Text className={'.text-Body'}>{item?.description}</Text>
      
      {/* TODO: 要等新的数据api 再更具有什么category去显示 */}
      <View className={s.category_label}> 产品类型 
        <View className={s.category}> {item?.categoryName} </View>
      </View>
      <View className={s.category_label}> 新旧程度 
        <View className={s.category}>{item?.categoryName} </View>
      </View>
      {imgList!=undefined && imgList.map((img) => ( 
        <Image src={"http://120.79.59.51:8087/"+img} mode="widthFix" className={s.image} >
        </Image>
      ))}
    </View>

    <View className={s.regular_divider}></View>

    {/* 卖家信息 */}
    <View className={s.contact_body}>
      <View className={s.header}>
        <View className={s.content}>
          <View className={s.user} >
            <Image src={item?.userProfileImgUrl != undefined? item?.userProfileImgUrl: ""} 
            className={s.avatar_lg} />
            <View className={s.name} >
              {item?.userName}
            </View>
          </View>
          <View className={s.btn}>
            <View className={s.btn_with_icon} onClick={toChatroom}>
              <Image src={MessageIcon} className={s.icon} />
              联系卖家
            </View>
            <View className={s.btn_with_icon} onClick={toShopPage}>
              <Image src={SellerShopIcon} className={s.icon} /> 
              <Text>Ta的店铺</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={s.thin_divider}></View>

      <View className={s.user}>
        <View className={s.contact_label}>交易地址</View>
        <View className={s.contact}> {item?.address}</View>
      </View>

      <View className={s.user}>
        <View className={s.contact_label}>联系方式</View>
        <View className={s.contact}> (加好友时请注明是【小土豆二手】上看到的) </View>
      </View>

        {(item?.weChatId != undefined && item.weChatId != "") && <View className={s.user} >
          <View className={s.contact_content} onClick={() => copyToClipboard(item.weChatId)}>
            <View><Image src={WeixinIcon} className={s.icon}/>
              <Text> {hideNumbers(item.weChatId)} </Text></View>
              <View className={s.copy}> 点击复制卖家微信</View>
          </View></View>}

        {(item?.telephone != undefined && item.telephone != "") &&<View className={s.user} > <View className={s.contact_content} 
        onClick={() => copyToClipboard(item.telephone)}>
          <View><Image src={MobileIcon} className={s.icon}/>
          <Text> {hideNumbers(item.telephone)} </Text></View>
          <View className={s.copy}> 点击复制卖家电话</View>
        </View></View>}
        
      <View className={s.regular_divider}></View>

      {/* 提示 */}
      <View className={s.warning}> 
      免责声明: 以上信息是发布者自行发布, 请<Text className={s.yellow}>【保持警惕】</Text> ，如遇违规行为，可进入【我的首页】联系客服举报。
      </View>
      <Text className={s.sp_label}>Produced by: 小土豆技术团队2021</Text>

    </View>
    </ScrollView>
  </View>
}

export default Index;