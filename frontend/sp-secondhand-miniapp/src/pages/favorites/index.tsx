import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {usePullDownRefresh} from '@tarojs/taro'
import { View } from '@tarojs/components'
import GoodsList from '../../components/GoodsList/GoodsList'
import { getFavoriteList } from '../../actions/favorite'



interface Props {
    userId:string
}
const Index: React.FC<Props> = () => {
    //定义状态、变量
    const dispatch = useDispatch();
    const favorite = useSelector(({favorite}) => favorite); // 储存着reducer里面的三个state
    let testUser = 333; //userID 333, itemId 960, 963

    //这里使用action获取数据
    useEffect(() => {
        if(favorite.favorites === [] && !favorite.isLoading) {
            getFavList(testUser);
        }

    }, [])

    usePullDownRefresh(()=>{
        getFavList( testUser);
    })

    const getFavList = (userId:number) => {
        dispatch(getFavoriteList(userId));
    }

    return (
        <View>
            <GoodsList showLoading={favorite.isLoading} showPlaceholder isFavouritesPage itemList={favorite.favorites} isShopPage={false}  ></GoodsList>
        </View>
    )
}

export default Index
