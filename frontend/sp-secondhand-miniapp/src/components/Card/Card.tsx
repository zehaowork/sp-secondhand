import React, { useState } from 'react';
import {View,Image, OpenData, RichText} from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
import "taro-ui/dist/style/components/action-sheet.scss";
import s from './Card.css';
import { Item } from 'src/typings/common';
import TypeTag from './TypeTag/TypeTag';

import CityTag from './CityTag/CityTag';
import Avatar from '../Avatar/Avatar';
import CategoryTag from './CategoryTag/CategoryTag';
import { Utils } from '../../../utils/Utils';

import {AtIcon} from 'taro-ui';
import API from '../../../utils/API'

interface Props {
    item:Item;
    isFavouritesPage:boolean;
    isShopPage:boolean;
    keyword?:string;
}


//商品显示组件
const Card: React.FC<Props> = (props) =>{
    const [isFavorite, setIsFavorite] = useState(false);
    //定义状态
    const [isOpened, setIsOpened] = useState(false);

    //定义行为
    
    // 打开商品详情
    const toDetail = ()=>{
        //TODO:添加商品详情路径
    }

    

    //渲染函数

    //加入收藏夹
    const toggleFavorite = ()=>{
        isFavorite?  deleteFavorite() : postFavorite();
    }


    const postFavorite = () => {
        API.SecondHand.postFavorite({
            userId:6,
            secondHandId:props.item.id
        }).then(res=>{
            if(res.statusCode === 200){
                setIsFavorite(!isFavorite);
            }
        }).catch(
            err =>{
                console.log(err)
        });
    }

    const deleteFavorite = () => {
        API.SecondHand.deleteFavorite({
            userId:6,
            secondHandId:props.item.id
        }).then(res=>{
            if(res.statusCode === 200){
                setIsFavorite(!isFavorite);
            }
        }).catch(
            err =>{
                console.log(err)
        });
    }


    return <View onClick={toDetail} className={s.container}>
    <View className={s.item} >
    <Image src={"http://120.79.59.51:8087/"+props.item.imgUrls} mode='aspectFill' className={s.image} >
    </Image>
         <AtIcon className={s.icon} 
           value={isFavorite?'heart-2':'heart'} 
           size='25' 
           color={isFavorite?'#e54d42':'#aaaaaa'}
           onClick={toggleFavorite}
         />
    </View>

    <View  className={s.info}>
        {/* 商品小标签 */}
        {!props.isShopPage && <View className={s.tags} >
            <CityTag CityName='Southampton' />
            <TypeTag GoodType={props.item.type} />
            <CategoryTag CategoryName='Item' />
        </View>}
        
         {/* 商品名字 以及商品价格 */}
        <View className='flex flex-space-between' >
            <View className={s.title}><RichText nodes={Utils.highlightKeyword(props.keyword,props.item.title,'#ffd101')} /></View>
            {!props.isShopPage && <View className='price-yellow' >£{props.item.price}</View>}
        </View>

        {/* 编辑按钮 - 只在商品列表下显示 */}
        {props.isShopPage && <View className='flex flex-space-between' >
            <View className='price-yellow' >£{props.item.price}</View>
            <View onClick={() => setIsOpened(!isOpened)}>
                <View className={s.dot}></View>
                <View className={s.dot}></View>
                <View className={s.dot}></View>
            </View>
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
        <AtActionSheet isOpened={isOpened} cancelText='取消' 
            onCancel={() => setIsOpened(false)} 
            onClose={() => setIsOpened(!isOpened)}>
                <AtActionSheetItem >重新编辑</AtActionSheetItem>
                <AtActionSheetItem >已经售出</AtActionSheetItem>
                <AtActionSheetItem >暂时下架</AtActionSheetItem>
                <AtActionSheetItem >彻底删除</AtActionSheetItem>
        </AtActionSheet>
    </View>
}
export default Card;
