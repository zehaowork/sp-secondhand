import React from 'react';
import Taro from '@tarojs/taro';
import {View,Image} from '@tarojs/components'
import s from './Card.css';
import { Item } from 'src/typings/common';
import PlaceHolder from '../../images/banner.jpg'
import TypeTag from './TypeTag/TypeTag';
import SeenBadge from './SeenBadge/SeenBadge';
import CityTag from './CityTag/CityTag';



interface Props {
    item:Item;
}



const Card: React.FC<Props> = (props) =>{
    //定义状态
    const app:any = Taro.getApp().$app;
    //定义Redux

    //定义 Handler

    


    return <View className={s.container}>
    <View className={s.item}>
    <Image src={PlaceHolder} mode='aspectFill' className={s.image} >
    <SeenBadge Popularity={props.item.popularity} />
    </Image>
    </View>

    <View  className={s.info}>
        <CityTag CityName={props.item.CityName} />
        <View className={s.title}>{props.item.Title}</View>
        <View className='flex flex-space-between' >
        <View className='price-yellow' >£{props.item.Price}</View>
        <TypeTag GoodType={props.item.GoodType} />
        </View>
       
    </View>
    </View>
}
export default Card;