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

const FETCH_FAVORITE_FAIL = (err)=>{
    return {
        type:GET_FAVORITE_FAIL,
        payload:err
    }
}

export const getFavoriteList = ()=>{
    return function(dispatch) {
        dispatch(FETCH_FAVORITE_REQUEST);
        API.SecondHand.getSecondHands
    }
}