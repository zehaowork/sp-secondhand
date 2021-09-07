import API from "../../utils/API"
import { GET_FAVORITE_REQUEST, GET_FAVORITE_FAIL, GET_FAVORITE_SUCCESS } from "../constants/favorite"


const FETCH_FAVORITE_REQUEST = ()=>{
    return {
        type:GET_FAVORITE_REQUEST,
    }
}

const FETCH_FAVORITE_SUCCESS = (payload)=>{
    return {
        type:GET_FAVORITE_SUCCESS,
        payload:payload
    }
}

const FETCH_FAVORITE_FAIL = (payload)=>{
    return {
        type:GET_FAVORITE_FAIL,
        payload:payload
    }
}

//用户界面用来dispatch的，根据不同的状态来navigate到不同的 action
export const getFavoriteList = (userId:string)=>{
    return function(dispatch) {
        dispatch(FETCH_FAVORITE_REQUEST());
        API.SecondHand.getFavorites(userId)
        .then(res => dispatch(FETCH_FAVORITE_SUCCESS(res.data)))
        .catch(err => dispatch(FETCH_FAVORITE_FAIL(err)));
    }
}