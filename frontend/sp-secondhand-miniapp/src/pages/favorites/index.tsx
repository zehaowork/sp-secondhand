import React, {useEffect} from 'react'
import { getCurrentInstance } from "@tarojs/taro";
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
    let id:string | undefined;
    const dispatch = useDispatch();
    const favorite = useSelector(({favorite}) => favorite); // 储存着reducer里面的三个state

    //这里使用action获取数据
    useEffect(() => {
        id = getCurrentInstance().router!.params.id;
        if(favorite.favorites === [] && !favorite.isLoading && id) {
            getFavList(id as unknown as number);
        }

    }, [])

    usePullDownRefresh(()=>{
        getFavList(id as unknown as number);
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
