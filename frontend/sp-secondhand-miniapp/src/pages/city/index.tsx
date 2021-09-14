import React,{useState,useEffect} from 'react'
import { View } from '@tarojs/components'
import Tag from '../../components/Tag/Tag'
import SearchBar from '../../components/SearchBar/SearchBar'
import s from './index.css'
import { AtIcon } from 'taro-ui'
import Indexes from '../../components/Indexes/Indexes'
import API from '../../../utils/API';
import { City } from 'src/typings/common'



interface Props{}
const Index: React.FC<Props> = () => {
    const [cityList, setCityList] = useState<City[]>([]);


    useEffect(() => {
        getCities();
    }, [])
    
    const getLocationPermission = ()=>{
        Taro.getLocation({
            type: 'wgs84'
        }).then(res =>{
            //TODO:添加获取经纬度后的回调
        }).catch(err =>{
            //TODO:获取权限失败的回调
        })
    }

    const getCities = ()=>{
        API.StaticData.getCities().then(res =>{
            if(res.statusCode === 200){
                (res.data.data as City[]).sort((a,b) =>a.firstLetter.charCodeAt(0)-b.firstLetter.charCodeAt(0));
                setCityList(res.data.data);
            }
            else{
                //TODO:添加错误信息
            }
        })
        .catch(err=>{
            //TODO:添加错误信息
        })
    }

    //渲染函数
    const renderCityList = ()=>{
        let initialFirstLetter:string;
        return cityList.map(city => {
            let isNewSection = initialFirstLetter !== city.firstLetter;
            initialFirstLetter = city.firstLetter;
            return <React.Fragment>
                {isNewSection && 
                <View className={s.section}>
                    {city.firstLetter}
                </View>}
                <View className={s.item}>{city.name}</View>
            </React.Fragment>
        
        })

    }
    
    return (
        <View className={s.page}>
            <Indexes />
        <SearchBar placeholder="搜索城市名或Postcode (请输入英文)" />
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
                    {renderCityList()}
                </View>
            </View>
        </View>
    )
}

export default Index
