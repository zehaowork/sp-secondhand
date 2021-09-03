import { View } from '@tarojs/components'
import React from 'react'
import GoodsList from '../../components/GoodsList/GoodsList'

//Pass in the prop isFavorites variable as TRUE in this GoodsList component

interface Props {}
const Index: React.FC<Props> = () => {
    return (
        <View>
            <GoodsList isFavouritesPage={true} itemList={[]} isShopPage={false}></GoodsList>
        </View>
    )
}

export default Index
