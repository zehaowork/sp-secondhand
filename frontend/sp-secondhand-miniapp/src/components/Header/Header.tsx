import React from 'react';
import {Button, Picker, Text, View} from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import s from './Header.css'




interface Props{
   title: string;
}

const Header: React.FC<Props> = (props)=>{

    return <View className={s.container} >
    {/* 标题 */}
    <View className={s.title} >
        {props.title}
    </View>

    {/* 排序按钮 */}
    <Picker mode='selector' range={[]} onChange={()=>{}}  >
    <View className={s.sort} >
        <Button className={s.btn_sm}>
        排序
        <AtIcon value='chevron-down' size='10' color='white'></AtIcon>
        </Button>
    </View>
    </Picker>
</View>
}
export default Header;