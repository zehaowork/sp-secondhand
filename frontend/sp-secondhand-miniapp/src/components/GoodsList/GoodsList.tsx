import React from 'react';
import {View,Picker, Button, Text} from '@tarojs/components'
import { Item } from 'src/typings/common';
import s from './GoodsList.css'
import Card from '../Card/Card';
import InlineLoader from '../InlineLoader/InlineLoader';



interface Props {
    isFavouritesPage:Boolean;
    itemList:Array<Item>;
}

//容器组件
const GoodsList: React.FC<Props> = (props)=>{

    //定义状态
   
  
   
    //定义行为

   

    //渲染函数

    //使用 Card 组件渲染商品列表
    const renderList = props.itemList.map((item:Item)=>{
        return <Card key={item.id} item={item} isFavouritesPage={props.isFavouritesPage}/>
    })
    
    return<View className={s.container} >
        {/* 头部部分：包括标题和排序按钮 */}
        <View className={s.listHeader} >
            {/* 标题 */}
            <View className={s.listTitle} >
                闲置好物
            </View>

            {/* 排序按钮 */}
            <Picker mode='selector' range={[]} onChange={()=>{}}  >
            <View className={s.sort} >
                <Button className={s.btn_sm}>
                排序
                    <Text className={s.icon_unfold}></Text>
                </Button>
            </View>
            </Picker>
        </View>

        {/* 列表 */}
        <View className={s.list} >
        {renderList}
        </View>
        
        <View className={s.loader} ><InlineLoader  showLoading /></View>
    </View>
}
export default GoodsList;
