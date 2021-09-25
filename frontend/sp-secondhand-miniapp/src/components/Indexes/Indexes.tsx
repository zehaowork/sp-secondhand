import React from 'react';
import {View} from '@tarojs/components'
import s from './Indexes.css'




interface Props{
    //事件
    onSelectChar:any;
   
    //参数
    chars:string[];
}

const Indexes: React.FC<Props> = (props)=>{

    const renderAlphabet = props.chars.map(char=>{
        return <View onClick={()=>{props.onSelectChar(char)}} className={s.btn}>{char}</View>
    });


    return <View className={s.container} >
       {renderAlphabet}
    </View>
}
export default Indexes;