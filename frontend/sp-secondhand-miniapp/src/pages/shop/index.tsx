import { View, Text, Picker } from '@tarojs/components'
import React, { useState } from 'react'
import s from './index.css'
import Tag from '../../components/Tag/Tag'
import GoodsList from '../../components/GoodsList/GoodsList'

interface Props {}
const Index: React.FC<Props> = () => {
    const [items, setItems] = useState<String[]>(); //item list

    //get item list -- api

    var itemList = [{id: 0, title: "电视", imgUrls: ["UploadImg/SH/544_202110021704340.jpg"], weChatId: "abcd", telephone: "12345678", price: 0, type: 0, address: "Southampton", userId: 0, publishTime: "", cityId: 0, isSold: true, popularity: 0, userName: "test User", categoryId: 3, categoryName: "电子电器", cityName: "南安普顿", condition: "BrandNew", description: "全新亚马逊购入 不小心买多了一个 Vita Portswood自取", userProfileImgUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/S3HiajIurlcWuyR3tGo7HzNm1qscDWicaD9YibWb66kCMAiaODpg4ZqI1VkymztAibcZyIG2HVkHFuXusrfE0Tdtx3w/132"}, {id: 0, title: "电视", imgUrls: ["UploadImg/SH/544_202110021704340.jpg"], weChatId: "abcd", telephone: "12345678", price: 0, type: 0, address: "Southampton", userId: 0, publishTime: "", cityId: 0, isSold: true, popularity: 0, userName: "test User", categoryId: 3, categoryName: "电子电器", cityName: "南安普顿", condition: "BrandNew", description: "全新亚马逊购入 不小心买多了一个 Vita Portswood自取", userProfileImgUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/S3HiajIurlcWuyR3tGo7HzNm1qscDWicaD9YibWb66kCMAiaODpg4ZqI1VkymztAibcZyIG2HVkHFuXusrfE0Tdtx3w/132"}]

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
                <GoodsList showLoading showPlaceholder isFavouritesPage={false} itemList={itemList} isShopPage={true}></GoodsList>
            
            </View>
           
    
    )
}

export default Index