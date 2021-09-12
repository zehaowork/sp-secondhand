import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useReachBottom,usePullDownRefresh} from '@tarojs/taro'
import { View } from '@tarojs/components'
import GoodsList from '../../components/GoodsList/GoodsList'
import { getFavoriteList } from '../../actions/favorite'

//Pass in the prop isFavorites variable as TRUE in this GoodsList component

interface Props {
    userId:string
}
const Index: React.FC<Props> = (props) => {
    //定义状态、变量
    const dispatch = useDispatch();
    const favorite = useSelector(({favorite}) => favorite); // 储存着reducer里面的三个state
    let testUser = 333; //userID 333, itemId 960, 963

    //这里使用action获取数据
    useEffect(() => {
        getFavList(favorite.page, testUser);
    }, [])

    useReachBottom(() => {
        getFavList(favorite.page, testUser);
      })
    
    usePullDownRefresh(()=>{
        getFavList(0, testUser);
    })

    const getFavList = (page:number, userId:number) => {
        dispatch(getFavoriteList({
            userId:userId, 
            page:page, 
            size:5
        }));
    }


    return (
        <View>
            <GoodsList isFavouritesPage itemList={favorite.favorites} isShopPage={false}  ></GoodsList>
        </View>
    )
}

export default Index
