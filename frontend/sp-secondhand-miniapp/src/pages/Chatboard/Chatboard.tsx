import { View, ScrollView } from '@tarojs/components'
import React from 'react'
import s from './Chatboard.css'
import ChatItem from '../../components/ChatItem/ChatItem'


interface Props{}
const Chatboard: React.FC<Props> = () => {
    const arr = [1, 2, 3, 4, 5]
    const chatItems = arr.map((value)=> {
        console.log(value)
        return <ChatItem></ChatItem>
    })
    return (
        <View>
            <ScrollView className={s.container}>
                {chatItems}
            </ScrollView> 
        </View>
    )
}

export default Chatboard

