import { View } from '@tarojs/components'
import React, {useState, useEffect} from 'react'
import GoodsList from '../../components/GoodsList/GoodsList'
import API from '../../../utils/API'
import { Item } from 'src/typings/common'

//Pass in the prop isFavorites variable as TRUE in this GoodsList component

interface Props {
    userId:string
}
const Index: React.FC<Props> = (props) => {
    const [itemList, setItemList] = useState<Array<Item>>([]);

    useEffect(() => {
        getFavoriteList();
    }, [])

     //获取收藏商品列表
  const getFavoriteList = ()=>{

    // API.SecondHand.getFavoritesByUserId(props.userId).then(
    API.SecondHand.getFavoritesByUserId("0").then(
        res => {
        if(res.statusCode === 200){
            console.log(res.data.data);
            setItemList(res.data.data);
            console.log("favorites get")
          }
    }).catch(
        err =>{
            console.log(err)
    })
  }


    return (
        <View>
            <GoodsList itemList={itemList} isFavouritesPage={true}></GoodsList>
        </View>
    )
}

export default Index
