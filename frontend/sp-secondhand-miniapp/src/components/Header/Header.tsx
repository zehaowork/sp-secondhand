import React from 'react';
import {Button, Picker, View} from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import s from './Header.css'




interface Props{
   title: string;
   subtitle?: string;
   children?: React.ReactNode //子组件
}

const Header: React.FC<Props> = (props)=>{

    return <View className={s.container} >
    {/* 标题 */}
    <View className={s.title} >
        <View>{props.title}</View>
        { props.subtitle && 
            <View className={s.subtitle} >
                {props.subtitle}
            </View>
        }
    </View>

    {/* 右边按钮 */} 
    {props.children}

</View>
}
export default Header;