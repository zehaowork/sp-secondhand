import React,{useEffect,useState} from 'react';
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components';
import { AtDivider } from 'taro-ui'
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


    //页面行为

    //初始化操作：继承之前的关键字和请求数据
    useEffect(() => {
        setKeyword($instance.router?.params.keyword === undefined?'':$instance.router?.params.keyword); // 继承搜索页面的关键字;
        search($instance.router?.params.keyword);
    }, [])

    const onInput = (input)=>{
        setKeyword(input);
    }

    //请求数据
    const search = (input?:string)=>{
        API.SecondHand.getSecondHands({
            catId:1,
            cityId:1,
            keyword:typeof input === 'string' ? input :keyword,
            page:page,
            size:5
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
        <Header title="搜索结果" />
        <GoodsList keyword={keyword} isFavouritesPage={false} itemList={itemList} />
        <View className={s.padding} >
        <AtDivider content='异地同类' fontColor='#aaaaaa' lineColor='#aaaaaa' />
        </View>
        {/* 异地物品 */}
        <GoodsList keyword={keyword} isFavouritesPage={false} itemList={itemList} />
        <InlineLoader showLoading />
    </View>
}
export default Result;