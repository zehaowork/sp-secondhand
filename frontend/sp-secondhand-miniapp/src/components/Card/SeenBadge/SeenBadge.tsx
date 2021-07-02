import React from 'react';
import Taro from '@tarojs/taro';
import {View,Image} from '@tarojs/components'
import s from './SeenBadge.css'
import SeenIcon from '../../../images/seen.svg'

interface Props {
    Popularity:number;
}

const SeenBadge: React.FC<Props> = (props)=>{

    return <View className={s.container} > 
    <Image className={s.icon} src={SeenIcon} />
    <View className={s.count}>{props.Popularity}</View>
    </View>
};
export default SeenBadge;