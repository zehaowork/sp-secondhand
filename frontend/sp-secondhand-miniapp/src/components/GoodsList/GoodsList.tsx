import React, {useState} from 'react';
import {View} from '@tarojs/components'
import { Item } from 'src/typings/common';
import s from './GoodsList.css'
import Card from '../Card/Card';
import {useSelector} from 'react-redux'



interface Props {
    isFavouritesPage?:boolean;
    isShopPage?:boolean;
    itemList:Array<Item>;
    keyword?:string;
}

//容器组件
const GoodsList: React.FC<Props> = (props)=>{
    const renderList = props.itemList.map((item:Item)=>{
        return <Card 
          keyword={props.keyword} 
          key={item.id} 
          item={item} 
          isFavouritesPage={props.isFavouritesPage}
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
