import React,{useState,useEffect} from 'react'
import Taro from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
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
    const [scrollAnchor, setScrollAnchor] = useState<string>('A');
    const [currentCity, setCurrentCity] = useState<City>({id:0,countryId:2,name:'英国',firstLetter:'A',isPopular:false});


    useEffect(() => {
        getCities();
        Taro.getStorage({
            key:'city'
        })
        .then(res => setCurrentCity(res.data))
        .catch(()=>setCurrentCity({id:0,countryId:2,name:'英国',firstLetter:'A',isPopular:false}))

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

    const onSelectCity = (city)=>{
        Taro.setStorage({
            key:'city',
            data:city
        }).then(()=>{
            Taro.navigateBack();
        }).catch(err=>{
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
                <View id={city.firstLetter} className={s.section}>
                    {city.firstLetter}
                </View>}
                <View onClick={()=>{onSelectCity(city)}} className={s.item}>{city.name}</View>
            </React.Fragment>
        
        })

    }

    const renderPopularCity = cityList
                                .filter(city => city.isPopular)
                                .map(city => <Tag key={city.id} size='normal' name={city.name} active={currentCity.id === city.id} onClick={()=>{onSelectCity(city)}} />)
    const distinctChars = ()=>{
        let chars:string[] = [];
        cityList.forEach(city=>{
            if(!chars.includes(city.firstLetter)){
                chars.push(city.firstLetter)
            }
        })
        return chars;
    }

    const onSelectChar = (char) =>{
        setScrollAnchor(char);
    }

    return (
        <ScrollView scrollIntoView={scrollAnchor}  scrollY className={s.page}>
            <Indexes onSelectChar={onSelectChar} chars={distinctChars()} />
        <SearchBar placeholder="搜索城市名或Postcode (请输入英文)" />
            <View className={s.container}>
            <View className={s.title} >当前城市定位</View>
                <View className={` ${s.tagGroup} ${s.navigation}`} >
                    <Tag size='normal' active={true} onClick={null} > 
                        <View className='margin-right'><AtIcon value='map-pin' size='13' color='white'/></View>
                        {currentCity.name}
                    </Tag>
                    <View className='flex flex-row flex-align-center' >
                    <View className='margin-right'><AtIcon value='map-pin' size='12' color='#ff8601'/></View>
                        开启定位</View>
                </View>
                <View className={s.title} >热门城市</View>
                <View className={s.tagGroup} >
                {renderPopularCity}
                </View>
                <View className={s.list} >
                    {renderCityList()}
                </View>
            </View>
        </ScrollView>
    )
}

export default Index
