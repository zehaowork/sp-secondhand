import React, { useEffect,useState } from 'react'
import Taro from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import s from './index.css'
import GoodsList from '../../components/GoodsList/GoodsList'
import Category from '../../components/Category/Category'
import BannerSwiper from '../../components/BannerSwiper/BannerSwiper'
import Header from '../../components/Header/Header'
import SearchBarPlaceholder from '../../components/SearchBarPlaceholder/SearchBarPlaceholder'
import InlineLoader from '../../components/InlineLoader/InlineLoader'
import CitySelector from '../../components/CitySelector/CitySelector'
import Fab from '../../components/Fab/Fab'
import {AtDivider} from 'taro-ui'
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
  //定义状态
  const [itemList, setItemList] = useState<Array<Item>>([]);
  const [page, setPage] = useState(0);
  const [catId, setCatId] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('别太放肆，我们可是有底线的噢-o-');

  //页面行为
  useEffect(() => {
   getList();
   getCategories();
  }, [])

  //回到顶部
  const toTop = ()=>{
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }

  //数据抓取

  //获取商品列表
  const getList = ()=>{
    setShowLoading(true);
    API.SecondHand.getSecondHands({
      catId:catId,
      cityId:1,
      keyword:'',
      page:page,
      size:5,
    }).then(res =>{
      setShowLoading(false);
      if(res.statusCode === 200){
        console.log(res.data.data);
        setItemList(res.data.data);
      }
      else{
        //TODO:添加错误信息
      }
    }).catch(err =>{
      setShowLoading(false);
      //TODO:添加错误信息
    })
  }

  //获取类别列表
  const getCategories = ()=>{
    API.Home.getCategories().then(res=>{
      if(res.statusCode === 200){
        console.log(res.data.data);
        setCategoryList(res.data.data);
      }
      else{
        //TODO:添加错误信息
      }
    }).catch(err =>{
       //TODO:添加错误信息
    })
  }

  const imageList = ['https://picsum.photos/200/300'];

  //打开搜索页面
  const toSearch = ()=>{
    Taro.navigateTo({
      url:'../search/index'
    })
  }
  // 打开城市列表页面
  const toCityPage = ()=>{
    Taro.navigateTo({
      url:'../city/index'
    })
  }

  return <View className={s.container}>
    <View className={s.header} >
      <CitySelector onClick={toCityPage} />
      <SearchBarPlaceholder onClick={toSearch} />
    </View>
  <BannerSwiper imageList ={imageList} />

  {/* 类型栏目 */}
  <Category categoryList={categoryList} />
  <Header title ='闲置好物' />

  {/* 商品列表 */}

  <GoodsList itemList={itemList} isFavouritesPage={false} isShopPage={false}/>
  {/* 加载组件 */}
  <View className={s.loader} >
    <AtDivider>
    <InlineLoader showLoading={showLoading} message={loadingText}  />
    </AtDivider>
    </View>

  {/* 点击添加 */}
  <View className={s.addMini} >
    <View className={s.addStyle}></View>
    <View className={s.addText}>点击右上角，添加小土豆</View>
  </View>

  {/* 回到顶部按钮 */}
  <View className={s.fab} >
  <Fab onClick={toTop} >
    <View>回到</View>
    <View>顶部</View>
    </Fab>
  </View>
</View>
}

export default Index;
