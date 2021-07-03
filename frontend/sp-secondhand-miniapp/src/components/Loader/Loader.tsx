import React from 'react';
import s from './Loader.css'
import {View} from '@tarojs/components'

interface Props{
    showLoading?: boolean
    size:'lg'|'sm'|'md'
}

const Loader: React.FC<Props> = (props) =>{
    return <View className={props.size ==='lg'?s.loader_lg:props.size==='md'?s.loader_md:s.loader_sm}></View>

}
export default Loader;

