import Taro from '@tarojs/taro'
import {GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_REQUEST, GET_CATEGORY_LIST_FAIL, GET_CITY_LIST_FAIL, GET_CITY_LIST_REQUEST, GET_CITY_LIST_SUCCESS} from '../constants/home'

export const FETCH_CATEGORY_LIST_REQUEST = ()=>{
    return {
        type:GET_CATEGORY_LIST_REQUEST
    }
}

export const FETCH_CATEGORY_LIST_SUCCESS = (categoryList)=>{
    return {
        type:GET_CATEGORY_LIST_SUCCESS,
        payload:categoryList
    }
}

export const FETCH_CATEGORY_LIST_FAIL = (error)=>{
    return {
        type:GET_CATEGORY_LIST_FAIL,
        payload:error
    }
}

export const FETCH_CITY_LIST_REQUEST = ()=>{
    return {
        type:GET_CITY_LIST_REQUEST
    }
}

export const FETCH_CITY_LIST_SUCCESS = (cityList)=>{
    return {
        type:GET_CITY_LIST_SUCCESS,
        payload:cityList
    }
}

export const FETCH_CITY_LIST_FAIL = (error)=>{
    return {
        type:GET_CITY_LIST_FAIL,
        payload:error
    }
}

// 发起请求获取CategoryList
export const getCategoryList : any = (baseUrl) => {
    return function (dispatch){
        dispatch(FETCH_CATEGORY_LIST_REQUEST)
        Taro.showLoading();
        Taro.request({
            url: baseUrl + 'home/items',
            method:'GET',
            header: {
              'Content-Type': 'application/json;charset=UTF-8',
            },
            success:function(res){
                Taro.hideLoading();
                let categoryList = res.data.data;
                dispatch(FETCH_CATEGORY_LIST_SUCCESS(categoryList));
            },
            fail:function(error){
                Taro.hideLoading();
                Taro.showToast({
                    title:'网络不好，请求失败！',
                    icon:'none',
                    duration:2000,
                });
                dispatch(FETCH_CATEGORY_LIST_FAIL(error.errMsg));
            }
        })
    }
}

// 发起请求获取getCityList
export const getCityList : any = (baseUrl, countryId) => {
    return function (dispatch){
        dispatch(FETCH_CITY_LIST_REQUEST)
        Taro.showLoading();
        Taro.request({
            url: baseUrl + 'home/cities/' + countryId,
            method:'GET',
            header: {
              'Content-Type': 'application/json;charset=UTF-8',
            },
            success:function(res){
                Taro.hideLoading();
                let cityList = res.data.data;
                dispatch(FETCH_CITY_LIST_SUCCESS(cityList));
            },
            fail:function(error){
                Taro.hideLoading();
                Taro.showToast({
                    title:'网络不好，请求失败！',
                    icon:'none',
                    duration:2000,
                });
                dispatch(FETCH_CITY_LIST_FAIL(error.errMsg));
            }
        })
    }
}