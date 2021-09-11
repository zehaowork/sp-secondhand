import React, { useEffect,useState } from 'react'
import Taro,{useReachBottom,usePullDownRefresh} from '@tarojs/taro'
import { View,Button } from '@tarojs/components'
import s from './index.css'
import GoodsList from '../../components/GoodsList/GoodsList'
import Categories from '../../components/Category/Categories'
import BannerSwiper from '../../components/BannerSwiper/BannerSwiper'
import Header from '../../components/Header/Header'
import SearchBarPlaceholder from '../../components/SearchBarPlaceholder/SearchBarPlaceholder'
import InlineLoader from '../../components/InlineLoader/InlineLoader'
import CitySelector from '../../components/CitySelector/CitySelector'
import Fab from '../../components/Fab/Fab'
import {AtDivider,AtActionSheet,AtActionSheetItem,AtIcon} from 'taro-ui'
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
  const [catId, setCatId] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('别太放肆，我们可是有底线的噢-o-');

  const [isSortOptionOpened, setIsSortOptionOpened] = useState(false);
  const [sortText, setSortText] = useState('排序');
  const sortOptions = ["最近发布","价格:低-高","价格:高-低","人气:高-低","人气:低-高"];

  /*页面行为*/
  // 初始抓取数据
  useEffect(() => {
  getList(page,catId);
  getCategories();
  }, []);

  useReachBottom(() => {
    getList(page,catId);
  })

  usePullDownRefresh(()=>{
    setPage(0);
    getList(0,catId);
  })
  
  //回到顶部
  const toTop = ()=>{
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }
  

  /**
   * 选择商品类别
   * @param id 类别id
   */
  const onSelectCategory = (e) => {
    let newCatId = Number(e.currentTarget.id);
    setCatId(newCatId);
    setPage(0);
    getList(0,newCatId);
  }

  

  /* 数据抓取 */
  //获取商品列表
  const getList = (page:number,catId:number)=>{
    setShowLoading(true);
    setLoadingText('努力加载中-o-');
    API.SecondHand.getSecondHands({
      catId:catId,
      cityId:469,
      keyword:'',
      page:page,
      size:5,
    }).then(res =>{
      if(res.statusCode === 200 && res.data.data.length){
        console.log(res.data.data);
        setPage(page+1);
        if(page === 0){
          setItemList(res.data.data);
        }
        else{
          setItemList([...itemList,...res.data.data]);
        }
        
      }
      else{
        //TODO:添加错误信息
      }
    }).catch(err =>{
      
      //TODO:添加错误信息
    }).finally(()=>{
      setShowLoading(false);
      setLoadingText('别太放肆，我们可是有底线的噢-o-');});
  }

  //获取类别列表
  const getCategories = ()=>{
    API.StaticData.getCategories().then(res=>{
      if(res.statusCode === 200){
        setCategoryList(res.data.data);
      }
      else{
        //TODO:添加错误信息
      }
    }).catch(err =>{
       //TODO:添加错误信息
    })
  }
  //渲染函数
  const imageList = ['https://picsum.photos/200/300'];

  const renderSortActions = sortOptions.map(option => <AtActionSheetItem onClick={()=>{setSortText(option);setIsSortOptionOpened(false)}} >{option}</AtActionSheetItem>)

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
  <Categories current={catId} onClick={onSelectCategory} categoryList={categoryList} />
  <Header title ='闲置好物' >
  <View className={s.sort} >
  <Button onClick={()=>{setIsSortOptionOpened(true)}} className={s.btn_sm}>
      {sortText}
      <AtIcon value='chevron-down' size='10' color='white'></AtIcon>
      </Button>
    </View>
  </Header>

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

  <AtActionSheet isOpened={isSortOptionOpened}
                 cancelText='取消' 
                 onCancel={()=>{setIsSortOptionOpened(false)}} 
                 onClose={()=>{setIsSortOptionOpened(false)}} >
                {renderSortActions}
        </AtActionSheet>
</View>
}

export default Index;
