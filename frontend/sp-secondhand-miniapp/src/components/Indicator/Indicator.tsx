import { View, ScrollView } from '@tarojs/components'
import React from 'react'
import s from './Indicator.css'

interface Props {}
const Indicator: React.FC<Props> = () => {
    return (
            <View className={s.container}>
                <View>
                    <View className={s.text}>我想买</View>
                    <View className={s.line}></View>
                </View>
                <View>
                    <View className={s.text}>我想卖</View>
                    <View className={s.line}></View>
                </View>
            </View>
    )
}

export default Indicator