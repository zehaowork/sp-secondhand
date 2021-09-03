import { View } from '@tarojs/components'
import React from 'react'
import Tag from '../../components/Tag/Tag'
import SearchBar from '../../components/SearchBar/SearchBar'
import s from './index.css'
import { AtIcon } from 'taro-ui'
import Indexes from '../../components/Indexes/Indexes'



interface Props{}
const Index: React.FC<Props> = () => {
    
    const getLocationPermission = ()=>{
        Taro.getLocation({
            type: 'wgs84'
        }).then(res =>{
            //TODO:添加获取经纬度后的回调
        }).catch(err =>{
            //TODO:获取权限失败的回调
        })
    }
    
    return (
        <View className={s.page}>
            <Indexes />
        <SearchBar placeholder="搜索城市名或Post Code (请输入英文)" />
            <View className={s.container}>
            <View className={s.title} >当前城市定位</View>
                <View className={` ${s.tagGroup} ${s.navigation}`} >
                    <Tag size='normal' active={true} onClick={null} > 
                        <View className='margin-right'><AtIcon value='map-pin' size='13' color='white'/></View>
                        南安普顿
                    </Tag>
                    <View className='flex flex-row flex-align-center' >
                    <View className='margin-right'><AtIcon value='map-pin' size='12' color='#ff8601'/></View>
                        开启定位</View>
                </View>
                <View className={s.title} >热门城市</View>
                <View className={s.tagGroup} >
                <Tag size='normal' name='全英国' active onClick={null} />
                <Tag size='normal' name='南安普顿'  onClick={null} />
                <Tag size='normal' name='诺丁汉'  onClick={null} />
                <Tag size='normal' name='曼彻斯特' active onClick={null} /> 
                </View>
                <View className={s.list} >
                    <View className={s.section}>A</View>
                    <View className={s.item}>阿伯丁</View>
                    <View className={s.item}>爱丁堡</View>
                    <View className={s.section}>B</View>
                    <View className={s.item}>伯恩茅斯</View>
                    <View className={s.item}>伯明翰</View>
                </View>
            </View>
        </View>
    )
}

export default Index
