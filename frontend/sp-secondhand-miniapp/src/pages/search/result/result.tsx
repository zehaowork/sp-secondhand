import React from 'react';
import {View} from '@tarojs/components';
import { AtDivider } from 'taro-ui'
import s from './result.css';
import SearchBar from '../../../components/SearchBar/SearchBar';
import GoodsList from '../../../components/GoodsList/GoodsList';
import InlineLoader from '../../../components/InlineLoader/InlineLoader';
import Header from '../../../components/Header/Header';
import { Item } from 'src/typings/common';





const Result:React.FC<any> = ()=>{
    //定义状态
    const historyList:Array<any> = [];
    const itemList:Array<Item> = [];

    return <View className={s.container} >
        {/* 搜索栏 */}
        <SearchBar placeholder="请输入商品关键词/名称/品牌" />
        {/* 同城物品 */}
        <Header title="搜索结果" />
        <GoodsList isFavouritesPage={false} itemList={itemList} />
        <View className={s.padding} >
        <AtDivider content='异地同类' fontColor='#aaaaaa' lineColor='#aaaaaa' />
        </View>
        <GoodsList isFavouritesPage={false} itemList={itemList} />
        <InlineLoader showLoading />
    </View>
}
export default Result;