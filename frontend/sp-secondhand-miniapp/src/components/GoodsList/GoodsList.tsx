import React from 'react';
import {View} from '@tarojs/components'
import { Item } from 'src/typings/common';
import s from './GoodsList.css'
import Card from '../Card/Card';



interface Props {
    isFavouritesPage:boolean;
    isShopPage:boolean;
    itemList:Array<Item>;
    keyword?:string;
}

//容器组件
const GoodsList: React.FC<Props> = (props)=>{

    //定义状态
   
  
   
    //定义行为

   

    //渲染函数
    props.itemList = [{id: 0, title: "电视", imgUrls: "https://img2.semeubler.com/5508/tv-oceanic-80-cm.jpg", weChatId: "abcd", telephone: "12345678", price: 0, type: 0, address: "Southampton", userId: 0, categoryId: 0, publishTime: "", cityId: 0, isSold: true, popularity: 0}, {id: 0, title: "电视", imgUrls: "https://img2.semeubler.com/5508/tv-oceanic-80-cm.jpg", weChatId: "abcd", telephone: "12345678", price: 0, type: 0, address: "Southampton", userId: 0, categoryId: 0, publishTime: "", cityId: 0, isSold: true, popularity: 0}, {id: 0, title: "电视", imgUrls: "https://img2.semeubler.com/5508/tv-oceanic-80-cm.jpg", weChatId: "abcd", telephone: "12345678", price: 0, type: 0, address: "Southampton", userId: 0, categoryId: 0, publishTime: "", cityId: 0, isSold: true, popularity: 0}]
    //使用 Card 组件渲染商品列表
    const renderList = props.itemList.map((item:Item)=>{
        return <Card 
                keyword={props.keyword} 
                key={item.id} 
                item={item} 
                isFavouritesPage={props.isFavouritesPage}
                isShopPage={props.isShopPage}/>
    })

    
    
    return<View className={s.container} >
        {/* 列表 */}
        <View className={s.list} >
        {renderList}
        </View>
    </View>
}
export default GoodsList;
