import React,{useState} from 'react';
import {View} from '@tarojs/components'
import { Item } from 'src/typings/common';
import s from './GoodsList.css'
import Card from '../Card/Card';

enum GoodType {
    New = 0,
    Used = 1,
    Shop = 2,
  }


//容器组件
const GoodsList: React.FC<any> = ()=>{

    //定义状态
    const [goodsList, setGoodsList] = useState<Array<Item>>([{ID:'0',Price:0,CityName:'test',Title:'测试',GoodType:GoodType.New,imgUrl:'images/',isSale:false,popularity:0,},{ID:'0',Price:0,CityName:'test',Title:'测试',GoodType:GoodType.New,imgUrl:'images/',isSale:false,popularity:0,},{ID:'0',Price:0,CityName:'test',Title:'测试',GoodType:GoodType.New,imgUrl:'images/',isSale:false,popularity:0,},{ID:'0',Price:0,CityName:'test',Title:'测试',GoodType:GoodType.New,imgUrl:'images/',isSale:false,popularity:0,}]);

    //声明周期


    //渲染函数
    const renderList = goodsList.map((item:Item)=>{
        return <Card key ={item.ID} item={item} />
    })
    

    return<View className={s.container} >
        {renderList}
    </View>
}
export default GoodsList;