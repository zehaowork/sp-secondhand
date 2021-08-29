
import React from 'react';
import {View} from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import s from './index.css';
import SearchBar from '../../components/SearchBar/SearchBar';

interface Props{

}

const Index :React.FC<Props> = ()=>{
    //定义状态
    const historyList:Array<any> = [];


    return <View className={s.container} >
        <SearchBar placeholder="请输入商品关键词/名称/品牌" />
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