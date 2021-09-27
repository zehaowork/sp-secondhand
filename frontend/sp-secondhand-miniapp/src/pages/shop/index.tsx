import { View, ScrollView, Text, Picker } from '@tarojs/components'
import React from 'react'
import s from './index.css'
import Tag from '../../components/Tag/Tag'
import GoodsList from '../../components/GoodsList/GoodsList'




interface Props {}
const Index: React.FC<Props> = () => {
    return(
            <View className={s.container}>
                <View className={s.indicator}>
                    <View className={s.tags}>
                        <Tag size='normal' onClick="Idk" active={true}>全部商品</Tag>
                        <Tag size='normal' onClick="Idk">在售1</Tag>
                        <Tag size='normal' onClick="Idk">已售10</Tag>
                    </View>
                    <View className={s.archive}>
                        <Text>下架商品</Text>
                    </View> 
                </View>
                <GoodsList showPlaceholder isFavouritesPage={false} itemList={[]} isShopPage={true}></GoodsList>
            
            </View>
           
    
    )
}

export default Index