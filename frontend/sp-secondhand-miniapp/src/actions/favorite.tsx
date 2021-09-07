import API from "../../utils/API"
import { GET_FAVORITE_REQUEST, GET_FAVORITE_FAIL, GET_FAVORITE_SUCCESS } from "../constants/favorite"

/**
 * 
 * @returns 返回action类型，reducer根据类型更改state
 */
const FETCH_FAVORITE_REQUEST = ()=>{
    return {
        type:GET_FAVORITE_REQUEST,
    }
}

/**
 * 
 * @param payload 请求返回的数据对象
 * @returns 返回数据对象和action类型给reducer
 */
const FETCH_FAVORITE_SUCCESS = (payload)=>{
    return {
        type:GET_FAVORITE_SUCCESS,
        payload:payload
    }
}

/**
 * 
 * @param payload 请求失败返回的错误信息对象
 * @returns 返回错误信息的对象和action类型给reducer
 */
const FETCH_FAVORITE_FAIL = (payload)=>{
    return {
        type:GET_FAVORITE_FAIL,
        payload:payload
    }
}

/**
 * 
 * @param userId 用户ID
 * @returns 根据不同的情况返回相应的action类型
 */
export const getFavoriteList = (userId:string)=>{
    return function(dispatch) {
        dispatch(FETCH_FAVORITE_REQUEST());
        API.SecondHand.getFavorites(userId)
        .then(res => dispatch(FETCH_FAVORITE_SUCCESS(res.data)))
        .catch(err => dispatch(FETCH_FAVORITE_FAIL(err)));
    }
}