import React from 'react'
import { View, ScrollView, Navigator, OpenData, Text, Image, Button, Input } from '@tarojs/components'
import s from "./index.css"

interface Props {}
const Index: React.FC<Props> = () => {
    return(
        <View className={s.container}>
            <View className={s.chatGroup}>
                <ScrollView 
                className={s.chatWrap} 
                scrollIntoView="{{ toView }}" scrollY
                // bindscrolltoupper='onReachTop'
                scrollWithAnimation={true}
                scrollTop={200}
                upperThreshold={0}
                 >
                     <View className={s.chatLabel}>
                         <View className={s.timeContainer}>
                            <View className={s.timeStyle}>01/01/2021 00:00:00</View>
                         </View>
                         <OpenData className={s.avatarTime} type="userAvatarUrl"></OpenData>
                         <View className={s.shareBox}>
                            <View className={s.itemContainer}>
                                <Text className={s.shareText}>Apple Pencil 1代</Text>
                                <View className={s.itemInfo}>
                                    <View className={s.imageAndPrice}>
                                        <Image className={s.itemAvatar} src="http://120.79.59.51:8087/UploadImg/SH/6_202105260231260.jpg"></Image>
                                        <Text className={s.shareTextPrice}>£50.00</Text>
                                    </View>
                                    <Navigator hoverClass="none" url="../initialization/goods_detail/goods_detail?id=385">
                                        <View className={s.checkBtn}>查看</View>
                                    </Navigator>
                                </View>
                            </View>
                         </View>
                     </View>
                     <View className={s.chatLabel}>
                         <OpenData className={s.avatarTime} type="userAvatarUrl"></OpenData>
                         <View className={s.articleBox}>Hi</View>
                     </View>
                     <View id="toFooter"></View>
                 </ScrollView>
                 <View className={s.chatFooterGroup} id="footerBtnGroup">
                     <View className={s.textInputBox}>
                        <Input 
                        className={s.textInput}
                        value=''
                        disabled={false}
                        name="useMsg"
                        cursorSpacing={20}
                        placeholder="请输入信息..."
                        placeholder-style="color:#999;" 
                        // bindinput="bindUserMsg"  
                        holdKeyboard={true}
                        ></Input>
                     </View>
                     <View className={s.sendMsgBox}>
                         <Button className={s.sendBtn} disabled={false}>发送</Button>
                     </View>
                 </View>
            </View>
        </View>
    )
}

export default Index