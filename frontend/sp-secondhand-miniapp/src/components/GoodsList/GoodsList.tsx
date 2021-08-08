import React,{useState} from 'react';
import {View,Picker, Button, Text} from '@tarojs/components'
import { Item } from 'src/typings/common';
import s from './GoodsList.css'
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import InlineLoader from '../InlineLoader/InlineLoader';

enum GoodType {
    New = 0,
    Used = 1,
    Shop = 2,
  }


//容器组件
const GoodsList: React.FC<any> = ()=>{

    //定义状态
    const [goodsList, setGoodsList] = useState<Array<Item>>([{ID:'0',CategoryName:'潮鞋服饰',Price:0,CityName:'南安普顿',Title:'LG 22寸显示屏',GoodType:GoodType.New,imgUrl:'images/',isSale:false,popularity:0,},{ID:'0',Price:0,CityName:'test',Title:'测试',GoodType:GoodType.New,imgUrl:'images/',isSale:false,popularity:0,},{ID:'0',Price:0,CityName:'test',Title:'测试',GoodType:GoodType.New,imgUrl:'images/',isSale:false,popularity:0,},{ID:'0',Price:0,CityName:'test',Title:'测试',GoodType:GoodType.New,imgUrl:'images/',isSale:false,popularity:0,}]);

    //声明周期


    //渲染函数
    const renderList = goodsList.map((item:Item)=>{
        return <Card key ={item.ID} item={item} />
    })
    

    return<View className={s.container} >
        <View className={s.listHeader} >
            <View className={s.listTitle} >
                闲置好物
            </View>
            <Picker mode='selector' range={[]} onChange={()=>{}}  >
            <View style="color:grey;font-size:32rpx" className={s.sort} >
                <Button className={s.btn_sm}>
                排序
                    <Text className={s.icon_unfold}>
                       
                    </Text>
                </Button>
            </View>
            </Picker>
        </View>
        <View className={s.list} >
        {renderList}
        </View>
        
        <View className={s.loader} ><InlineLoader  showLoading /></View>
    </View>
}
export default GoodsList;