import { View, ScrollView, Swiper, SwiperItem } from '@tarojs/components'
import React from 'react'
import s from './chatboard.css'
import ChatItem from '../../components/ChatItem/ChatItem'
import Indicator from '../../components/Indicator/Indicator'


interface Props{}
const Chatboard: React.FC<Props> = () => {
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
            <View className={s.line}></View>
            <Indicator></Indicator>
            <Swiper indicatorColor='#999'
                    indicatorActiveColor='#333'
                    vertical={false}
                    circular
                    indicatorDots
                    autoplay>
                <SwiperItem>
                    <ScrollView className={s.container}>
                        {chatItems}
                    </ScrollView> 
                </SwiperItem>
                <SwiperItem>
                    <ScrollView className={s.container}>
                        {chatItems2}
                    </ScrollView> 
                </SwiperItem>
            </Swiper>
        </View>
    )
}

export default Chatboard

