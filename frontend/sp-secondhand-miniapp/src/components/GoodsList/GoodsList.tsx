import React, {useEffect, useState} from 'react';
import {View} from '@tarojs/components'
import { Item } from 'src/typings/common';
import s from './GoodsList.css'
import Card from '../Card/Card';
import {useDispatch,useSelector} from 'react-redux'
import { getFavoriteList } from '../../actions/favorite'



interface Props {
    isFavouritesPage:boolean;
    isShopPage:boolean;
    itemList:Array<Item>;
    keyword?:string;
    page:number;
}

//容器组件
const GoodsList: React.FC<Props> = (props)=>{

    //定义状态、变量
    const dispatch = useDispatch();
    const favorite = useSelector(({favorite}) => favorite); // 储存着reducer里面的三个state

    //这里使用action获取收藏夹数据
    useEffect(() => {
        dispatch(getFavoriteList({
            userId:333,
            page:props.page,
            size:5
        })); //userID 333, itemId 960, 963 are favorited
    }, [])
    
    //定义行为

   

    //渲染函数
    // props.itemList = [{id: 0, title: "电视", imgUrls: "https://img2.semeubler.com/5508/tv-oceanic-80-cm.jpg", weChatId: "abcd", telephone: "12345678", price: 0, type: 0, address: "Southampton", userId: 0, categoryId: 0, publishTime: "", cityId: 0, isSold: true, popularity: 0}, {id: 0, title: "电视", imgUrls: "https://img2.semeubler.com/5508/tv-oceanic-80-cm.jpg", weChatId: "abcd", telephone: "12345678", price: 0, type: 0, address: "Southampton", userId: 0, categoryId: 0, publishTime: "", cityId: 0, isSold: true, popularity: 0}, {id: 0, title: "电视", imgUrls: "https://img2.semeubler.com/5508/tv-oceanic-80-cm.jpg", weChatId: "abcd", telephone: "12345678", price: 0, type: 0, address: "Southampton", userId: 0, categoryId: 0, publishTime: "", cityId: 0, isSold: true, popularity: 0}]

    //使用 Card 组件渲染商品列表
    const renderList = props.itemList.map((item:Item)=>{
        return <Card 
          keyword={props.keyword} 
          key={item.id} 
          item={item} 
          isFavouritesPage={favorite.favorites.some((fav:Item) => fav.id === item.id)}
          isShopPage={props.isShopPage}
        />
    })

    
    
    return<View className={s.container} >
        {/* 列表 */}
        <View className={s.list} >
        {renderList}
        </View>
    </View>
}
export default GoodsList;
