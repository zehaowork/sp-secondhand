import { View, Image, Text, MovableArea, MovableView } from '@tarojs/components'
import React from 'react'
import GoodsList from '../../components/GoodsList/GoodsList'

//Pass in the prop isFavorites variable as TRUE in this GoodsList component

interface Props {}
const Index: React.FC<Props> = () => {
    return (
        <View>
            <GoodsList isFavoritesPage={true}></GoodsList>
        </View>
    )
}

export default Index
