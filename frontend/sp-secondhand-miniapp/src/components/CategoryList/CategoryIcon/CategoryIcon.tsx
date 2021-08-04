import React from 'react';
import {View,Image} from '@tarojs/components'
import s from './CategoryIcon.css'
import { Category } from 'src/typings/common';
import Taro from '@tarojs/taro';

enum GoodType {
    New = 0,
    Used = 1,
    Shop = 2,
  }

  
  interface Props{
    Category:Category
  }

//容器组件
const CategoryIcon: React.FC<Props> = (props)=>{

    //定义状态
    const baseUrl = Taro.getApp().$app.AppData.imgUrl;
    //声明周期


    //渲染函数
    
    return<View className={s.container} >
        <View className={s.imageContainer}>
        <Image className={s.image} src={baseUrl + props.Category.imgUrl} />
        </View>
        <View className={s.text} >
            {props.Category.name}
        </View>
    </View>
}
export default CategoryIcon;