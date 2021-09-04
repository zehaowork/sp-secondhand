import React from 'react';
import {View,Image, OpenData, RichText, Picker} from '@tarojs/components'
import s from './Card.css';
import { Item } from 'src/typings/common';
import TypeTag from './TypeTag/TypeTag';

import CityTag from './CityTag/CityTag';
import Avatar from '../Avatar/Avatar';
import CategoryTag from './CategoryTag/CategoryTag';
import { Utils } from '../../../utils/Utils';



interface Props {
    item:Item;
    isFavouritesPage:boolean;
    isShopPage:boolean;
    keyword?:string;
}


//商品显示组件
const Card: React.FC<Props> = (props) =>{
    //定义状态
 
    //定义行为
    
    // 打开商品详情
    const toDetail = ()=>{
        //TODO:添加商品详情路径
    }


    //渲染函数



    return <View onClick={toDetail} className={s.container}>
    <View className={s.item}>
    <Image src={props.item.imgUrls} mode='aspectFill' className={s.image} >
    </Image>
    </View>

    <View  className={s.info}>
        {/* 商品小标签 */}
        {!props.isShopPage && <View className={s.tags} >
            <CityTag CityName="Southampton" />
            <TypeTag GoodType={props.item.type} />
            <CategoryTag CategoryName="Item" />
        </View>}
        
         {/* 商品名字 以及商品价格 */}
        <View className='flex flex-space-between' >
            <View className={s.title}><RichText nodes={Utils.highlightKeyword(props.keyword,props.item.title,'#ffd101')} /></View>
            {!props.isShopPage && <View className='price-yellow' >£{props.item.price}</View>}
        </View>

        {/* 编辑按钮 - 只在商品列表下显示 */}
        {props.isShopPage && <View className='flex flex-space-between' >
            <View className='price-yellow' >£{props.item.price}</View>
            <Picker className={s.options} mode='selector' range={["重新编辑", "已经售出", "暂时下架", "彻底删除"]} onChange={()=>{}}>
                <View >
                    <View className={s.dot}></View>
                    <View className={s.dot}></View>
                    <View className={s.dot}></View>
                </View>
            </Picker>
        </View>}

       {/* 商家信息 */}
        {(!props.isShopPage || !props.isFavouritesPage) && <View className='flex flex-space-between' >
            <View className={s.user}>
                <Avatar size='sm' isAuthorized />
                <OpenData className={s.name}  type='userNickName' />
            </View>
            <View className={s.name}>{props.item.popularity}人想要</View>
          </View>
        }
        
    </View>
    </View>
}
export default Card;
