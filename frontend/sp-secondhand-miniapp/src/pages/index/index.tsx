import React from 'react'

import { View, Button, Text } from '@tarojs/components'



import s from './index.css'
import GoodsList from '../../components/GoodsList/GoodsList'
import CategoryList from '../../components/CategoryList/CategoryList'
import BannerSwiper from '../../components/BannerSwiper/BannerSwiper'



// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

export enum GoodType {
  New = 0,
  Used = 1,
  Shop = 2,
}

//Pass in FALSE as the isFavorites boolean into GoodsList component

interface Props {}
const Index: React.FC<Props> = ()=>{
  return <View className={s.container}>
  <BannerSwiper />
  <CategoryList />
  <GoodsList isFavoritesPage={false}/>
</View>
}

export default Index
