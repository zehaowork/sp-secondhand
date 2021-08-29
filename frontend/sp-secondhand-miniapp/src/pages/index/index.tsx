import React, { useEffect,useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import s from './index.css'
import GoodsList from '../../components/GoodsList/GoodsList'
import CategoryList from '../../components/CategoryList/CategoryList'
import BannerSwiper from '../../components/BannerSwiper/BannerSwiper'
import API from '../../../utils/API'
import { Item } from 'src/typings/common'

export enum GoodType {
  New = 0,
  Used = 1,
  Shop = 2,
}

//Pass in FALSE as the isFavourites boolean into GoodsList component

interface Props {}
const Index: React.FC<Props> = ()=>{

  const [itemList, setItemList] = useState<Array<Item>>([]);
  useEffect(() => {
   getList();
  }, [])


  //数据抓取
  const getList = ()=>{
    API.SecondHand.getSecondHands({
      catId:1,
      cityId:1,
      keyword:'',
      page:0,
      size:5,
    }).then(res =>{
      if(res.statusCode === 200){
        console.log(res.data.data);
        setItemList(res.data.data);
      }
      else{
        //TODO:添加错误信息
      }
    }).catch(err =>{
      //TODO:添加错误信息
    })
  }

  const toSearch = ()=>{
    Taro.navigateTo({
      url:'../search/index'
    })
  }

  return <View className={s.container}>
    <View  onClick={toSearch} >搜索入口</View>
  <BannerSwiper />
  <CategoryList />
  <GoodsList itemList={itemList} isFavouritesPage={false}/>
</View>
}

export default Index
