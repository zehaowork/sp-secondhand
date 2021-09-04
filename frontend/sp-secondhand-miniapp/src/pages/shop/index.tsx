import { View, ScrollView, Text, Picker } from '@tarojs/components'
import React from 'react'
import s from './index.css'
import Tag from '../../components/Tag/Tag'
import GoodsList from '../../components/GoodsList/GoodsList'




interface Props {}
const Index: React.FC<Props> = () => {
    return(
        <View>
            <View className={s.container}>
                <View className={s.topContainer}>
                    <View className={s.tagContainer}>
                        <Tag size="normal" onClick="Idk" active={true}>全部商品</Tag>
                        <Tag size="normal" onClick="Idk">在售1</Tag>
                        <Tag size="normal" onClick="Idk">已售10</Tag>
                    </View>
                    <View className={s.nextPageContainer}>
                        <Text>下架商品</Text>
                    </View> 
                </View>
            </View>
            <View className={s.goodsContainer}>
                <GoodsList isFavouritesPage={false} itemList={[]} isShopPage={true}></GoodsList>
            </View>
        </View>
    )
}

export default Index