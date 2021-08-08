import { View, Image, Text, MovableArea, MovableView } from '@tarojs/components'
import React from 'react'

import s from './Badge.css'

interface Props {}
const Badge: React.FC<Props> = () => {
    return (
        <View className={s.notifyBadge}>3</View>
    )
}

export default Badge