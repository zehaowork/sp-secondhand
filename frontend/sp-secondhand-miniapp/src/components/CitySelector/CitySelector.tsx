import React from 'react';
import {Text, View} from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import s from './CitySelector.css'




interface Props{
 onClick:any
 name:string
}

const CitySelector: React.FC<Props> = (props)=>{

    return <View onClick={props.onClick} className={s.container} >
   <Text>{props.name}</Text>
   <AtIcon value='chevron-down' size='16' color='F00' />
</View>
}
export default CitySelector;