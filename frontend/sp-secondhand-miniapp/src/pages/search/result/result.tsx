import React,{useEffect,useState} from 'react';
import Taro,{useReachBottom} from '@tarojs/taro'
import {View,Button} from '@tarojs/components';
import { AtDivider,AtIcon,AtActionSheet,AtActionSheetItem} from 'taro-ui'
import s from './result.css';
import SearchBar from '../../../components/SearchBar/SearchBar';
import GoodsList from '../../../components/GoodsList/GoodsList';
import Header from '../../../components/Header/Header';
import InlineLoader from '../../../components/InlineLoader/InlineLoader';
import { City, Item } from 'src/typings/common';
import API from '../../../../utils/API';





const Result:React.FC<any> = ()=>{
    //定义状态
    const [itemList, setItemList] = useState<Array<Item>>([]);
    const [historyList, setHistoryList] = useState<string[]>([]); //搜索历史记录数组
    const [itemRecommendationList, setItemRecommendationList] = useState<Array<Item>>([]);
    const [keyword, setKeyword] = useState<string>(''); //搜索关键字
    const [page, setPage] = useState<number>(0);
    const [city, setCity] = useState<City>({id:0,countryId:2,name:'英国',firstLetter:'A',isPopular:false});
    const $instance = Taro.getCurrentInstance(); //页面对象
    const [isFinished, setIsFinished] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const [isSortOptionOpened, setIsSortOptionOpened] = useState<boolean>(false);
    const [selectedSortOption, setSelectedSortOption] = useState<[string,string]>(['TimeDesc','排序']);
    const sortOptions:Array<[string,string]> = [
    ['TimeDesc','最近发布'],
    ['PopularityDesc',"人气:高-低"],
    ['PopularityAsc',"人气:低-高"],
    ['PriceDesc',"价格:高-低"],
    ['PriceAsc',"价格:低-高"],
  ]

    //页面行为

    //初始化操作：继承之前的关键字和请求数据
    useEffect(() => {
        setKeyword($instance.router?.params.keyword === undefined?'':$instance.router?.params.keyword); // 继承搜索页面的关键字;
        

        Taro.getStorage({
            key:'city'
        }).then(res=>{
            setCity(res.data as City);
            search(isFinished,page,selectedSortOption[0],(res.data as City).id,$instance.router?.params.keyword);
        }).catch(()=>{
            search(isFinished,page,selectedSortOption[0],city.id,$instance.router?.params.keyword);
        })

        getSearchHistory();
    }, [])

    const getSearchHistory = ()=>{
        Taro.getStorage({
            key:'searchHistory'
        }).then(res =>{
            setHistoryList(JSON.parse(res.data));
        }).catch(err=> setHistoryList([]));
    }
    
    useReachBottom(()=> {
        search(isFinished,page,selectedSortOption[0],city.id,keyword)
    })

    const onInput = (input)=>{
        setKeyword(input);
    }

    //请求数据
    const search = (isFinished: boolean,page:number,option:string,cityId:number,input?:string)=>{
        setShowLoading(true);
       if(!isFinished){
        API.SecondHand.getSecondHands({
            catId:0,
            cityId:cityId,
            keyword:typeof input === 'string' ? input :keyword,
            page:page,
            size:6,
            sort:option
        }).then(res=>{

            if(res.statusCode === 200){
                setPage(page+1);
                if(page === 0){
                    setItemList(res.data.data);
                }
                else{
                    setItemList([...itemList,...res.data.data]);
                }
                if(res.data.data.length !== 6) {
                    setIsFinished(true);
                    setPage(0);
                }
                
            }
            else{
                //TODO:添加错误信息
            }
        }).catch(err =>{
            //TODO:添加错误信息
        }).finally(()=>setShowLoading(false));
       }
       else{
           searchExcludeCity(option,cityId,input);
       }
    }

    const addKeywordToHistory = (keyword)=>{
        if(!historyList.includes(keyword)){ //查看关键词时候有重复，不重复则添加
            let newList:Array<string> = [];
            if(historyList.length){
                newList = [keyword,...historyList];
            }
            else{
                newList.push(keyword);
            }

            setHistoryList(newList);
            Taro.setStorage({
                key:'searchHistory',
                data:JSON.stringify(newList)
            });
        }
    }

    const searchExcludeCity = (option:string,cityId:number,input?:string) => {
        API.SecondHand.getSecondHandExcludeCity({
            catId:0,
            cityId:cityId,
            keyword:typeof input === 'string' ? input :keyword,
            page:page,
            size:6,
            sort:option
        }).then(res=>{
            if(page === 0){
                setItemRecommendationList(res.data.data);
            }
            else{
                setItemRecommendationList([...itemRecommendationList,...res.data.data]);
            }
            setPage(page+1);
        }).finally(()=>setShowLoading(false))
    }

    //搜索按钮
    const onClick = () =>{
        setIsFinished(false);
        setPage(0);
        setSelectedSortOption(['TimeDesc','排序']);
        setItemList([]);
        setItemRecommendationList([]);
        search(false,0,'TimeDesc',city.id);
        addKeywordToHistory(keyword);
    }

    const onSelectSortOption = (option) =>{
        setIsFinished(false);
        setIsSortOptionOpened(false);
        setSelectedSortOption(option);
        setPage(0);
        setItemList([]);
        setItemRecommendationList([]);
        search(false,0,option[0],city.id)
      }

    const renderSortActions = sortOptions.map(option => <AtActionSheetItem onClick={()=>{onSelectSortOption(option)}} >{option[1]}</AtActionSheetItem>)

    return <View className={s.container} >
        {/* 搜索栏 */}
        <View className={s.searchBar}>
        <SearchBar 
        onInput={onInput} 
        keyword={keyword}
        onConfirm={onClick}
        onClick={onClick}
        placeholder="请输入商品关键词/名称/品牌" />
        </View>
        {/* 同城物品 */}
        <Header title ='闲置好物' subtitle='同城商品'>
            <View className={s.sort} >
                <Button onClick={()=>{setIsSortOptionOpened(true)}} className={s.btn_sm}>
                    {selectedSortOption[1]}
                <AtIcon value='chevron-down' size='10' color='white'></AtIcon>
                </Button>
            </View>
        </Header>
        <GoodsList showLoading={showLoading} showPlaceholder keyword={keyword} isFavouritesPage={false} itemList={itemList} />
        {
            itemRecommendationList.length !==0
            &&
            <React.Fragment>
                <View className={s.padding} >
                <AtDivider content='周边好物' fontColor='#aaaaaa' lineColor='#aaaaaa' />
                </View>
                {/* 异地物品 */}
                <GoodsList showLoading={showLoading} keyword={keyword} isFavouritesPage={false} itemList={itemRecommendationList} />
            </React.Fragment>
        }
        <InlineLoader showLoading={showLoading} />

        <AtActionSheet 
            isOpened={isSortOptionOpened}
            cancelText='取消' 
            onCancel={()=>{setIsSortOptionOpened(false)}} 
            onClose={()=>{setIsSortOptionOpened(false)}} 
        >
    {renderSortActions}
  </AtActionSheet>
    </View>
}
export default Result;