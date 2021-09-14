import React,{useEffect,useState} from 'react';
import Taro from '@tarojs/taro'
import {View,Button} from '@tarojs/components';
import { AtDivider,AtIcon,AtActionSheet,AtActionSheetItem} from 'taro-ui'
import s from './result.css';
import SearchBar from '../../../components/SearchBar/SearchBar';
import GoodsList from '../../../components/GoodsList/GoodsList';
import Header from '../../../components/Header/Header';
import InlineLoader from '../../../components/InlineLoader/InlineLoader';
import { Item } from 'src/typings/common';
import API from '../../../../utils/API';





const Result:React.FC<any> = ()=>{
    //定义状态
    const [itemList, setItemList] = useState<Array<Item>>([]);
    const [keyword, setKeyword] = useState<string>(''); //搜索关键字
    const [page, setPage] = useState<number>(0);
    const $instance = Taro.getCurrentInstance(); //页面对象

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
        search(selectedSortOption[0],$instance.router?.params.keyword);
    }, [])

    const onInput = (input)=>{
        setKeyword(input);
    }

    //请求数据
    const search = (option:string,input?:string)=>{
        API.SecondHand.getSecondHands({
            catId:0,
            cityId:469,
            keyword:typeof input === 'string' ? input :keyword,
            page:page,
            size:5,
            sort:option
        }).then(res=>{
            if(res.statusCode === 200){
                console.log(res);
                setItemList(res.data.data);
            }
            else{
                //TODO:添加错误信息
            }
        }).catch(err =>{
            //TODO:添加错误信息
        })
    }

    const onSelectSortOption = (option) =>{
        setIsSortOptionOpened(false);
        setSelectedSortOption(option);
        setPage(0);
        search(option[0])
      }

    const renderSortActions = sortOptions.map(option => <AtActionSheetItem onClick={()=>{onSelectSortOption(option)}} >{option[1]}</AtActionSheetItem>)

    return <View className={s.container} >
        {/* 搜索栏 */}
        <View className={s.searchBar}>
        <SearchBar 
        onInput={onInput} 
        keyword={keyword}
        onConfirm={search}
        onClick={search}
        placeholder="请输入商品关键词/名称/品牌" />
        </View>
        {/* 同城物品 */}
        <Header title ='闲置好物' >
            <View className={s.sort} >
                <Button onClick={()=>{setIsSortOptionOpened(true)}} className={s.btn_sm}>
                    {selectedSortOption[1]}
                <AtIcon value='chevron-down' size='10' color='white'></AtIcon>
                </Button>
            </View>
        </Header>
        <GoodsList keyword={keyword} isFavouritesPage={false} itemList={itemList} />
        <View className={s.padding} >
        <AtDivider content='周边好物' fontColor='#aaaaaa' lineColor='#aaaaaa' />
        </View>
        {/* 异地物品 */}
        <GoodsList keyword={keyword} isFavouritesPage={false} itemList={itemList} />
        <InlineLoader showLoading />

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