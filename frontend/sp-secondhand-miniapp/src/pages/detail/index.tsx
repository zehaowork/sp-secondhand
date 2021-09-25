import React, { useEffect, useState, } from 'react'
import Taro from '@tarojs/taro';
import { View, Text, Image } from "@tarojs/components"
import s from './index.css'
import Avatar from '../../components/Avatar/Avatar'
import API from '../../../utils/API'
import { Item } from 'src/typings/common'
import { AtIcon } from 'taro-ui';

const Index: React.FC = () => {
  const [item, setItem] = useState<Item>(); //商品信息
  const $instance = Taro.getCurrentInstance(); //页面对象
  const itemId = $instance.router?.params.id === undefined ? '' : $instance.router?.params.id;
  const [isFavorite, setIsFavorite] = useState(false);

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

  return <View className={s.container}>
    <View className={s.header}>
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
          <AtIcon className={s.icon} 
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
    <View className={s.info_details}>
      <View className={s.price}>£ {item?.price}</View>
      <Text className={'.text-Body'}>{item?.description}</Text>
      
      {/* TODO: 要等新的数据api 再更具有什么category去显示 */}
      <View className={s.category_label}> 产品类型 
        <View className={s.category}> {item?.categoryName} </View>
      </View>
      <View className={s.category_label}> 新旧程度 
        <View className={s.category}>{item?.categoryName} </View>
      </View>
      {/* TODO: loop image list */}
      <Image src={"http://120.79.59.51:8087/"+item?.imgUrls} mode="widthFix" className={s.image} >
      </Image>
    </View>
    <View className={s.regular_divider}></View>

    {/* 卖家信息 */}
    <View className={s.contact_details}>
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
            {/* TODO: add corresponding icons */}
            <View>联系卖家</View>
            <View>Ta的店铺</View>
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

      {/* TODO: add icons */}
        {item?.weChatId != undefined && <View className={s.user} ><View className={s.contact_content} 
        onClick={() => copyToClipboard(item.weChatId)}>
          <Text >{item.weChatId} </Text>
          <View className={s.copy}> 点击复制卖家微信</View>
        </View></View>}

        {item?.telephone != undefined && <View className={s.user} > <View className={s.contact_content} 
        onClick={() => copyToClipboard(item.telephone)}>
          <Text >{item.telephone} </Text>
          <View className={s.copy}> 点击复制卖家电话</View>
        </View></View>}
        
      <View className={s.regular_divider}></View>

      {/* 提示 */}
      <View className={s.warning}> 
      免责声明: 以上信息是发布者自行发布, 请<Text className={s.yellow}>【保持警惕】</Text> ，如遇违规行为，可进入【我的首页】联系客服举报。
      </View>
      <Text className={s.sp_label}>Produced by: 小土豆技术团队2021</Text>

    </View>
  </View>
}

export default Index;