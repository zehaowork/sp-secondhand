
import Taro from '@tarojs/taro';
import {View,Image, OpenData, RichText} from '@tarojs/components'
import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';

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
import { addFavorite,deleteFavorite } from '../../actions/favorite';

interface Props {
    item:Item;
    isFavouritesPage?:boolean;
    isShopPage?:boolean;
    keyword?:string;
    isProperty:boolean;
}

//商品显示组件
const Card: React.FC<Props> = (props) =>{
    //定义状态
    const [isOpened, setIsOpened] = useState(false);
    const [isNewFav, setIsNewFav] = useState(false);
    const dispatch = useDispatch();
    const favorite = useSelector(({favorite}) => favorite);

    //定义行为
    
    // 打开商品详情
    const toDetail = ()=>{
        Taro.navigateTo({
            url:'../detail/index?isProperty=' + props.isProperty + '&&item='+JSON.stringify(props.item)
        })
    }

    //加入收藏
    const add = ()=>{
        dispatch(addFavorite({userId:333,item:props.item}))
        setIsNewFav(true);
    }

    //删除收藏
    const del = ()=>{
        dispatch(deleteFavorite({userId:333,item:props.item}))
        setIsNewFav(false);
    }
    
    const isFav = favorite.favorites.some(fav => fav.id === props.item.id);
    //渲染函数
    useEffect(() => {
        if (!isFav) {
            setIsNewFav(false);
        }
    }, [isFav])
    
    var onClick = (e) => {
        e[0].stopPropagation();
        isFav? del() : add();
    }

    return <View onClick={toDetail} className={s.container}>
    <View className={s.item} >
    <Image src={"http://120.79.59.51:8087/"+props.item.imgUrls[0]} mode='aspectFill' className={s.image} >
    </Image>
    <View className={s.icon} >
    <AtIcon className={isNewFav && s.heartBeat} 
           value={isFav?'heart-2':'heart'} 
           size='20' 
           color={isFav?'#e54d42':'white'}
           onClick = {onClick.bind(this)}
         />
    </View>
         
    </View>

    <View  className={s.info}>
        {/* 商品小标签 */}
        {!props.isShopPage && <View className={s.tags} >
            <CityTag CityName={props.item.cityName} />
            <TypeTag GoodType={props.item.type} />
            <CategoryTag CategoryName={props.item.categoryName} />
        </View>}
        
         {/* 商品名字 以及商品价格 */}
        <View className='flex flex-space-between' >
            <View className={s.title}><RichText nodes={Utils.highlightKeyword(props.keyword,props.item.title,'#ff8601')} /></View>
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
                
                <Avatar size='sm' imageUrl={props.item.userProfileImgUrl} />
                <View className={s.name} >{props.item.userName}</View>
            </View>
            <View className={s.name}>{props.item.popularity}人看过</View>
          </View>
        }
    </View>
        {/* 编辑商品 */}
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
