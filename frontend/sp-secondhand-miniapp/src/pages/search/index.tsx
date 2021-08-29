
import React from 'react';
import Taro from '@tarojs/taro';
import {View} from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import s from './index.css';
import SearchBar from '../../components/SearchBar/SearchBar';



const Index :React.FC<any> = ()=>{
    //定义状态
    const historyList:Array<any> = [];

    const onConfirm = ()=>{
        Taro.navigateTo({
            url:'./result/result'
        })
    }


    return <View className={s.container} >
        {/* 搜索栏 */}
        <SearchBar 
        placeholder="请输入商品关键词/名称/品牌"
        onConfirm={onConfirm}
        />
        {/* 内容区域 */}
        <View className={s.content}>
            {/* 最近搜索标题栏目 */}
            <View className={s.title} >
                <View className={s.icon} >
                <AtIcon value='clock' size='16' color='F00' />
                </View>
                <View className={s.text} >最近搜索</View>
                <View className={s.iconRight} >
                <AtIcon value='trash' size='16' color='F00' />
                </View>
            </View>
            {/* 列表 */}
            {historyList.length>0?
                <View className={s.list} >
                <View className={s.item} >电风扇</View>
            </View>:
            <View className={s.empty} >暂无记录</View>
            }
            {/* 搜索发现栏目 */}
            <View className={s.found} >
                <View className={s.title} >
                    <View className={s.icon} >
                    <AtIcon value='eye' size='16' color='F00' />
                    </View>
                    <View className={s.text} >搜索发现</View>
                </View>
                {/* 列表 */}
                <View className={s.list} >
                    <View className={s.item} >牙刷</View>
                </View>
            </View>  
        </View>
    </View>
}
export default Index;