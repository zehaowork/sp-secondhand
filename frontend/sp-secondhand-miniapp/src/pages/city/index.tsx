import React,{useState,useEffect} from 'react'
import Taro, { checkIsSoterEnrolledInDevice } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import Tag from '../../components/Tag/Tag'
import SearchBar from '../../components/SearchBar/SearchBar'
import s from './index.css'
import { AtIcon, AtToast } from 'taro-ui'
import "taro-ui/dist/style/components/toast.scss";
import Indexes from '../../components/Indexes/Indexes'
import API from '../../../utils/API';
import { City } from 'src/typings/common'
import InlineLoader from '../../components/InlineLoader/InlineLoader'
import { useDispatch, useSelector } from 'react-redux'
import { getCityList } from "../../actions/cities";



interface Props{}
const Index: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const cities = useSelector(({ cityList }) => cityList);
    const [scrollAnchor, setScrollAnchor] = useState<string>('A');
    const [currentCity, setCurrentCity] = useState<City>({id:0,countryId:2,name:'英国',firstLetter:'A',isPopular:false,englishName:"United Kingdom"});
    const [locateSuccess, setLocateSuccess] = useState(false);
    const [locateFail, setLocateFail] = useState(false);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        getCities();
    }, [])
    
    const getLocationPermission = ()=>{
        Taro.getLocation({
            type: 'wgs84'
        }).then(res =>{
            API.GoogleMaps.getReverseGeoEncoding(res.latitude+","+res.longitude)
            .then(res => {
                const locateCity = res.data.results[0].address_components[2].short_name;
                const foundCity = cities.cityList.find(city => city.englishName == locateCity);
                if(foundCity != undefined){
                    setCurrentCity(foundCity);
                    setLocateSuccess(true);
                }else {
                    setLocateFail(true);
                }
            })
        }).catch(err =>{
            //TODO:获取权限失败的回调
        })
    }


    const getCities = ()=>{
        if((cities.cityList as City[]).length === 0){
            dispatch(getCityList());
        }
    }

    const onSelectCity = (city:City)=>{
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
        return cities.cityList.map(city => {
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

    const renderPopularCity = cities.cityList
                                .filter(city => city.isPopular)
                                .map(city => <Tag 
                                    key={city.id} 
                                    size='normal' 
                                    name={city.name} 
                                    active={currentCity.id === city.id} 
                                    onClick={()=>{onSelectCity(city)}} />)
    const distinctChars = ()=>{
        let chars:string[] = [];
        cities.cityList.forEach(city=>{
            if(!chars.includes(city.firstLetter)){
                chars.push(city.firstLetter)
            }
        })
        return chars;
    }

    const onSelectChar = (char) =>{
        setScrollAnchor(char);
    }

    const onInput = (input:string)=>{
        setKeyword(input);
    }

    return (
        <ScrollView scrollIntoView={scrollAnchor}  scrollY className={s.page}>
            <Indexes onSelectChar={onSelectChar} chars={distinctChars()} />
        <SearchBar 
        keyword={keyword}
        onInput={onInput}
        placeholder="搜索城市名或Postcode (请输入英文)"
        />
            <View className={s.container}>
            <View className={s.title} >当前城市定位</View>
                <View className={` ${s.tagGroup} ${s.navigation}`} >
                    <Tag size='normal' active={true} onClick={()=>{onSelectCity(currentCity)}} > 
                        <View className='margin-right'><AtIcon value='map-pin' size='13' color='white'/></View>
                        {currentCity.name}
                    </Tag>
                    <View onClick={getLocationPermission} className='flex flex-row flex-align-center' >
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
            {cities.isLoading && <InlineLoader showLoading ={cities.isLoading} message="加载城市列表中..."  />}
            <AtToast status="success" text={` $你已成功定位到${currentCity?.name}`} isOpened={locateSuccess} onClose={() => setLocateSuccess(false)}></AtToast>
            <AtToast status="error" text="无法找到对应的城市，请利用搜索或下滑点选所在城市" isOpened={locateFail} onClose={() => setLocateFail(false)}></AtToast>
        </ScrollView>
    )
}

export default Index
