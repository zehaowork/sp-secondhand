import React,{useState} from 'react';
import {View,Picker, Button, Text} from '@tarojs/components'
import { Item } from 'src/typings/common';
import s from './GoodsList.css'
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import InlineLoader from '../InlineLoader/InlineLoader';
import { useSelector } from 'react-redux';
import { getItemList } from 'src/actions/itemList';

enum GoodType {
    New = 0,
    Used = 1,
    Shop = 2,
  }

interface Props {
    isFavoritesPage:Boolean;
}

//容器组件
const GoodsList: React.FC<any> = (props)=>{

    //定义状态
    // const [goodsList, setGoodsList] = useState<Array<Item>>([{ID:'0',CategoryName:'潮鞋服饰',Price:0,CityName:'南安普顿',Title:'LG 22寸显示屏',GoodType:GoodType.New,imgUrl:'images/',isSale:false,popularity:0,},{ID:'0',CategoryName:'潮鞋服饰',Price:0,CityName:'test',Title:'测试',GoodType:GoodType.New,imgUrl:'images/',isSale:false,popularity:0,},{ID:'0',Price:0,CategoryName:'潮鞋服饰',CityName:'test',Title:'测试',GoodType:GoodType.New,imgUrl:'images/',isSale:false,popularity:0,}]);
    const [goodsList, setGoodsList] = useState<Array<Item>>([{id: 0, title: 'LG 22寸显示屏', imgUrls:'images/', description: 'It is a TV', weChatId: 'ABCD', telephone: '12345678', price: 0, type: 0, address: 'Somewhere', userId: 0, categoryId: 469, publishTime: "2021-08-24T01:09:16.134Z", cityId: 1, isSold: true, popularity: 0}, {id: 0, title: 'LG 22寸显示屏', imgUrls:'images/', description: 'It is a TV', weChatId: 'ABCD', telephone: '12345678', price: 0, type: 0, address: 'Somewhere', userId: 0, categoryId: 469, publishTime: "2021-08-24T01:09:16.134Z", cityId: 1, isSold: true, popularity: 0}, {id: 0, title: 'LG 22寸显示屏', imgUrls:'images/', description: 'It is a TV', weChatId: 'ABCD', telephone: '12345678', price: 0, type: 0, address: 'Somewhere', userId: 0, categoryId: 469, publishTime: "2021-08-24T01:09:16.134Z", cityId: 1, isSold: true, popularity: 0}])
    const itemList = useSelector(state => state.itemList.itemList)
    //声明周期
    
    //Create interface Props here that includes a boolean variable 
    //stating whether the page we are rendering is the favorites page
    //Pass this variable into the Card component below and render that way
    const isFavPage = props.isFavoritesPage 

    //渲染函数

    const renderList = itemList.map((item:Item)=>{
        return <Card key={item.id} item={item} isFavoritesPage={isFavPage}/>
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
