import React, {useState} from 'react';
import {View,Image, OpenData, RichText} from '@tarojs/components'
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
    keyword?:string;
}


//商品显示组件
const Card: React.FC<Props> = (props) =>{
    const [isFavorite, setIsFavorite] = useState(false);
    //定义状态
 
    //定义行为
    
    // 打开商品详情
    const toDetail = ()=>{
        //TODO:添加商品详情路径
    }


    //渲染函数

    //加入收藏夹
    const toggleFavorite = ()=>{
        API.SecondHand.postFavorite({
            userId:0,
            secondHandId:props.item.id
        }).then(
            // setIsFavorite();

        ).catch(
            err =>{
                console.log(err)
            }
        )
    }

    return <View onClick={toDetail} className={s.container}>
    <View className={s.item} style={{background:"grey"}}>
         <AtIcon className={s.icon} 
         value={isFavorite?'heart-2':'heart'} 
         size='25' 
         color='#F00'
         onClick={toggleFavorite}/>

    <Image src={props.item.imgUrls} mode='aspectFill' className={s.image} >
    </Image>
    </View>

    <View  className={s.info}>
        {/* 商品小标签 */}
        <View className={s.tags} >
            <CityTag CityName={props.item.CityName} />
            <TypeTag GoodType={props.item.type} />
            <CategoryTag CategoryName={props.item.CategoryName} />
        </View>
        
         {/* 商品名字 以及商品价格 */}
        <View className='flex flex-space-between' >
            <View className={s.title}><RichText nodes={Utils.highlightKeyword(props.keyword,props.item.title,'#ffd101')} /></View>
            <View className='price-yellow' >£{props.item.price}</View>
        </View>

       {/* 商家信息 */}
        {!props.isFavouritesPage && <View className='flex flex-space-between' >
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
