import { View, Image, Text, MovableArea, MovableView } from '@tarojs/components'
import React from 'react'

import s from './ChatItem.css'

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
                        <Image className={s.avatar} src=""></Image>
                        <View className={s.notifyBadge}></View>
                    </View>
                        <View className={s.nameAndMsg}>
                            <Text className={s.contactName} >James</Text>
                            <Text className={s.lastMsg} >Last message</Text>
                        </View>
                    </View>
                    <Text className={s.time} >01/01/2021</Text>
                </View>
            </MovableView>
            <View className={s.line}></View>
        </MovableArea>
    )
}

export default ChatItem

