import React from 'react';
import {View} from '@tarojs/components'
import s from './Indexes.css'
import { AtIcon } from 'taro-ui';



interface Props{
    //事件
   
    //参数
    
}

const Indexes: React.FC<Props> = (props)=>{

    const renderAlphabet = (charA,charZ) =>{
        var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (; i <= j; ++i) {
            a.push(<View className={s.btn} >{String.fromCharCode(i).toUpperCase()}</View>);
        }
        return a;
    }


    return <View className={s.container} >
       {renderAlphabet('a', 'z')}

    </View>
}
export default Indexes;