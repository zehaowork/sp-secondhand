import { View, Image, Text, MovableArea, MovableView } from '@tarojs/components'
import React from 'react'

import s from './ChatItem.css'
import Badge from '../Badge/Badge'

interface Props {}
const ChatItem: React.FC<Props> = () => {
    return (
        <MovableArea className={s.area}>
            <MovableView className={s.chartarea}
                damping = {100}
                direction="horizontal" 
                x="{{chatarea.swipeX}}" 
                data-index="{{index}}" 
        
                out-of-bounds={true}
                animation={true}
            >
                <View className={s.chatbox}>
                    <View className={s.contactDetails}>
                    <View className={s.chatboxLeft}>
                        <Image className={s.avatar} src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3300&q=80"></Image>
                        <Badge></Badge>
                    </View>
                        <View className={s.nameMsgDate}>
                            <Text className={s.contactName}>James</Text>
                            <Text className={s.lastMsg}>Nothing</Text>
                            <Text className={s.time}>01/01/2021</Text>
                        </View>  
                        <View className={s.chatboxRight}>
                            <View className={s.isSold}>已售</View>
                        </View>  
                    </View>
                    
                </View>
            </MovableView>
            <View className={s.line}></View>
        </MovableArea>
    )
}

export default ChatItem