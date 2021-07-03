import { OpenData, View ,Image, Text,} from '@tarojs/components';
import React from 'react';
import s from './index.css';

//组件资源
import Avatar from '../../components/Avatar/Avatar';
import SystemButton from '../../components/SystemButton/SystemButton';

//图片资源
import AboutIcon from '../../images/about.png';
import ShopIcon from '../../images/shop.png';
import MessageIcon from '../../images/message.png';
import ShareColorIcon from '../../images/share_color.png';
import CustomerServiceIcon from '../../images/customer_service.png'

interface Props{

}

const Index: React.FC<Props> = ()=>{
    return <View className={s.container}>
        {/* 用户基本信息 */}
        <View className={s.header} >
        <View className={s.content}>
            <View className={s.user} >
                <Avatar size='lg' isAuthorized  />
                <View className={s.name} >
                    <OpenData type='userNickName' ></OpenData>
                </View>
            </View>
        </View>
        </View>
    
    {/* 用户子界面列表 */}
    <View className={s.list}>
        <View  className={s.item}>
            <Image src={ShopIcon} className={s.icon} />
            我的店铺
            <Text className={s.redirect} >〉</Text>     
        </View>
        <View  className={s.item}>
            <Image src={AboutIcon} className={s.icon} />
            关于我们
            <Text className={s.redirect} >〉</Text>     
        </View>
        <View  className={s.item}>
            <Image src={MessageIcon} className={s.icon} />
            我的私信
            <Text className={s.redirect} >〉</Text>     
        </View>
    </View>

    <SystemButton type='share' color="ORANGE" text='分享小程序' src={ShareColorIcon} /> 
    <SystemButton type='contact' color='GREEN' text='联系客服' src={CustomerServiceIcon} /> 
    </View>
}
export default Index;