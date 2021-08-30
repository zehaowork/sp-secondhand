import React from 'react';
import {View} from '@tarojs/components'
import s from './InlineLoader.css'
import Loader from '../Loader/Loader';

interface Props{
    message?:string;
    showLoading:boolean;
}

const InlineLoader: React.FC<Props> = (props)=>{
    return <View className={s.container}>
        <Loader size='sm' showLoading={props.showLoading} />
        {props.message&&<View className={props.showLoading ? s.messageLoading: s.message} >{props.message}</View>}
    </View>
}
export default InlineLoader;