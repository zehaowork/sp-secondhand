import { View, Image, Text, MovableArea, MovableView } from '@tarojs/components'
import React from 'react'

import s from './ChatItem.css'
import Badge from '../Badge/Badge'

interface Props {}
const ChatItem: React.FC<Props> = () => {
    return (
        <MovableArea className={s.area}>
            <MovableView className={s.chartarea}
               
            >
                <View className={s.chatbox}>
                    <View className={s.contactDetails}>
                    <View className={s.chatboxLeft}>
                        
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