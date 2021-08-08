import React from 'react';
import Taro from '@tarojs/taro';
import {View,Image, OpenData} from '@tarojs/components'
import s from './Card.css';
import { Item } from 'src/typings/common';
import PlaceHolder from '../../images/banner.jpg'
import TypeTag from './TypeTag/TypeTag';

import CityTag from './CityTag/CityTag';
import Avatar from '../Avatar/Avatar';
import CategoryTag from './CategoryTag/CategoryTag';



interface Props {
    item:Item;
}


//商品显示组件
const Card: React.FC<Props> = (props) =>{
    //定义状态
    const app:any = Taro.getApp().$app;
    //定义Redux

    //定义 Handler

    


    return <View className={s.container}>
    <View className={s.item}>
    <Image src={PlaceHolder} mode='aspectFill' className={s.image} >
    {/* <SeenBadge Popularity={props.item.popularity} /> */}
    </Image>
    </View>

    <View  className={s.info}>
        {/* 商品小标签 */}
        <View className={s.tags} >
            <CityTag CityName={props.item.CityName} />
            <TypeTag GoodType={props.item.GoodType} />
            <CategoryTag CategoryName={props.item.CategoryName} />
        </View>
        
         {/* 商品名字 以及商品价格 */}
        <View className='flex flex-space-between' >
            <View className={s.title}>{props.item.Title}</View>
            <View className='price-yellow' >£{props.item.Price}</View>
        </View>

       {/* 商家信息 */}
        <View className='flex flex-space-between' >
        <View className={s.user}>
            <Avatar size='sm' isAuthorized />
            <OpenData className={s.name}  type='userNickName' />
        </View>
        <View className={s.name}>1000人想要</View>
        </View>
        
    </View>
    </View>
}
export default Card;