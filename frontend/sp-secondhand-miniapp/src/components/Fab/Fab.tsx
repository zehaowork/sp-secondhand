import React from 'react';
import {View} from '@tarojs/components'
import s from './Fab.css'



interface Props{
    // 参数
    children: React.ReactNode

    // 事件
    onClick:any    
}

const Fab: React.FC<Props> = (props)=>{
    return <View onClick={props.onClick} className={s.container}>
        {props.children}
    </View>
}
export default Fab;