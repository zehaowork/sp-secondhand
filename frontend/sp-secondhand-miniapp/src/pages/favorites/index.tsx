import React, {useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { View } from '@tarojs/components'
import GoodsList from '../../components/GoodsList/GoodsList'
import { Item } from 'src/typings/common'
import { getFavoriteList } from '../../actions/favorite'

//Pass in the prop isFavorites variable as TRUE in this GoodsList component

interface Props {
    userId:string
}
const Index: React.FC<Props> = (props) => {
    //定义状态、变量
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const favorite = useSelector(({favorite}) => favorite); // 储存着reducer里面的三个state
    
    //这里使用action获取数据
    useEffect(() => {
        dispatch(getFavoriteList({
            userId:333,
            page:page,
            size:5
        })); //userID 333, itemId 960, 963 are favorited
    }, [])

     //获取商品列表
//   const getFavoriteList = ()=>{

    

     //这个部分已经移动到action了，记得查看
//     // API.SecondHand.getFavoritesByUserId("0").then(
//     //     res => {
//     //     if(res.statusCode === 200){
//     //         console.log(res.data.data);
//     //         setItemList(res.data.data);
//     //       }
//     // }).catch(
//     //     err =>{
//     //         console.log(err)
//     // })
//   }


    return (
        <View>
            <GoodsList isFavouritesPage itemList={favorite.favorites==undefined? [] : favorite.favorites } isShopPage={false} page={page} ></GoodsList>
        </View>
    )
}

export default Index
