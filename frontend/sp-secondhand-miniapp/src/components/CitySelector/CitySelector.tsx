import React from 'react';
import {Text, View} from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import s from './CitySelector.css'




interface Props{
 
}

const CitySelector: React.FC<Props> = (props)=>{

    return <View className={s.container} >
   <Text>南安普顿</Text>
   <AtIcon value='chevron-down' size='16' color='F00' />
</View>
}
export default CitySelector;