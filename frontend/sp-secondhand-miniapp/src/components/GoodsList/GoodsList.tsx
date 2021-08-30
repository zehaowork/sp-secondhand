import React from 'react';
import {View,Picker, Button, Text} from '@tarojs/components'
import { Item } from 'src/typings/common';
import s from './GoodsList.css'
import Card from '../Card/Card';
import InlineLoader from '../InlineLoader/InlineLoader';



interface Props {
    isFavouritesPage:Boolean;
    itemList:Array<Item>;
    keyword?:string;
}

//容器组件
const GoodsList: React.FC<Props> = (props)=>{

    //定义状态
   
  
   
    //定义行为

   

    //渲染函数

    //使用 Card 组件渲染商品列表
    const renderList = props.itemList.map((item:Item)=>{
        return <Card 
                keyword={props.keyword} 
                key={item.id} 
                item={item} 
                isFavouritesPage={props.isFavouritesPage}/>
    })
    
    return<View className={s.container} >
        {/* 列表 */}
        <View className={s.list} >
        {renderList}
        </View>
    </View>
}
export default GoodsList;
