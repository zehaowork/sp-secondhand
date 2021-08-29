import React from 'react';
import {Input, View} from '@tarojs/components'
import s from './SearchBar.css'
import { AtIcon } from 'taro-ui';



interface Props{
    //事件
    onChange?: Function;
    onFocus?: Function;
    onClear?: Function;
    onBlur?: Function;
    onConfirm: any;
    onActionClick?: Function;
 
    //参数
    placeholder?: string;
    maxlength?: number;
    actionName?:string;
}

const SearchBar: React.FC<Props> = (props)=>{




    return <View className={s.container} >
        <View className={s.search} >
        <View  className={s.icon} >
        <AtIcon value='search' size='13' color='F00' />
        </View>
        <Input onConfirm={props.onConfirm} className={s.input} placeholder={props.placeholder} confirmType='search'  />
        </View>
        <View className={s.action} >
            <View className={s.btn} >搜索</View>
        </View>
    </View>
}
export default SearchBar;