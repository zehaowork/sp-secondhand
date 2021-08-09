import { View, ScrollView, Swiper, SwiperItem } from '@tarojs/components'
import React from 'react'
import s from './index.css'
import ChatItem from '../../components/ChatItem/ChatItem'
import Indicator from '../../components/Indicator/Indicator'


interface Props{}
const Index: React.FC<Props> = () => {
    const arr = [1, 2]
    const arr2 = [1, 2, 3]
    const chatItems = arr.map((value)=> {
        console.log(value)
        return <ChatItem></ChatItem>
    })
    const chatItems2 = arr2.map((value) => {
        console.log(value)
        return <ChatItem></ChatItem>
    })
    return (
        <View>
           
            <Indicator />
            <Swiper 
                className={s.swiper}
               
                    >
                <SwiperItem>
                    <ScrollView>
                        {chatItems}
                    </ScrollView> 
                </SwiperItem>
                <SwiperItem>
                    <ScrollView >
                        {chatItems2}
                    </ScrollView> 
                </SwiperItem>
            </Swiper>
        </View>
    )
}

export default Index
