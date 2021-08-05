import { View, ScrollView } from '@tarojs/components'
import React from 'react'
import s from './Indicator.css'

interface Props {}
const Indicator: React.FC<Props> = () => {
    return (
        <View>
            <View className={s.indicatorContainer}>
                <View className={s.buyContainer}>
                    <View className={s.buy}>我想买</View>
                    <View className={s.indicatorLine}></View>
                </View>
                <View className={s.sellContainer}>
                    <View className={s.sell}>我想卖</View>
                    <View className={s.indicatorLine}></View>
                </View>
            </View>
        </View>
    )
}

export default Indicator