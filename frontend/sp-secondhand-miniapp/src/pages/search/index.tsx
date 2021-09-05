
import React,{useState} from 'react';
import Taro from '@tarojs/taro';
import {View} from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import s from './index.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import Tag from '../../components/Tag/Tag';



const Index :React.FC<any> = ()=>{
    //定义状态
    const historyList:Array<any> = []; //搜索历史记录数组
    const [keyword, setKeyword] = useState(''); //搜索关键词
    const exploreList = ['吹风机','锅','水壶','咖啡','香水'];

    //定义行为
    const onInput = (input:string)=>{
        setKeyword(input);
    }

    const toResult = ()=>{
        
        Taro.navigateTo({
            url:'./result/result?keyword='+keyword
        })
    }

    //点击Tag的事件
    const onSelectTag = (value:string)=>{
        setKeyword(value);
    }

    //渲染函数
    const renderExploreList = exploreList.map(item => <Tag size='normal' name={item} circle onClick={()=>{onSelectTag(item)}} />)

    return <View className={s.container} >
        {/* 搜索栏 */}
        <SearchBar 
        placeholder="请输入商品关键词/名称/品牌"
        onConfirm={toResult}
        onClick={toResult}
        onInput={onInput}
        keyword={keyword}
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
                    {renderExploreList}
                </View>
            </View>  
        </View>
    </View>
}
export default Index;