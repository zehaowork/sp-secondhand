import Taro from '@tarojs/taro';
import { searchSecondHandParam, favoritesSecondHandParam, toggleFavoriteParam } from 'src/typings/common';
//服务器地址
const BASE_URL:String = 'http://test.smallpotatoestech.com:8087/api/';
const header:String = 'application/x-www-form-urlencoded';

enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

const API = {
    //二手相关API
    SecondHand:{
        getSecondHands: function(data:searchSecondHandParam) {
            return Taro.request({
                url:BASE_URL+'secondHand',
                data:data,
                header:header,
                method:Method.GET,
            })
        },
        getSecondHand: function(data) {
            
        },

        //通过用户id获取收藏列表
        getFavorites: function(data:favoritesSecondHandParam) {
            return Taro.request({
                url:BASE_URL+'secondHand/favorite/'+ data.userId,
                data:data,
                header:header,
                method:Method.GET,
            })
        },

        //加入收藏
        postFavorite: function(data:toggleFavoriteParam){
            return Taro.request({
                url:BASE_URL+'secondHand/favorite',
                data:data,
                header:header,
                method:Method.POST,
            })
        },
        
        //取消收藏
        deleteFavorite: function(data:toggleFavoriteParam){
            return Taro.request({
                url:BASE_URL+'secondHand/favorite?secondHandId='+data.secondHandId+'&userId='+data.userId,
                header:header,
                method:Method.DELETE,
            })
        }

    },
    //主页相关动态资源API
    StaticData:{
        getCategories: function() {
            return Taro.request({
                url:BASE_URL+'staticData/categories',
                header:header,
                method:Method.GET,
            })
        },
        getBanners:()=>{
            return Taro.request({
                url:BASE_URL+'staticData/banners',
                header:header,
                method:Method.GET,
            })
        },
        getSearchRecommendations:()=>{
            return Taro.request({
                url:BASE_URL+'staticData/recommendedSearch',
                method:Method.GET,
                header:header,
            })
        }
    },
    
}
export default API;