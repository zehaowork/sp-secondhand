import { ADD_FAVORITE_FAIL, ADD_FAVORITE_REQUEST, ADD_FAVORITE_SUCCESS, DELETE_FAVORITE_FAIL, DELETE_FAVORITE_REQUEST, DELETE_FAVORITE_SUCCESS, GET_FAVORITE_FAIL, GET_FAVORITE_REQUEST, GET_FAVORITE_SUCCESS } from "../constants/favorite";
import {Item} from '../typings/common'

interface FAVORITE_STATE {
    isLoading:boolean;
    isAdding:boolean;
    favorites:Item[];
    errMsg:string;
    page:number;
}

const INITIAL_STATE:FAVORITE_STATE = {
    isLoading:false, //用来条件渲染 loading bar
    isAdding:false, //用来观察当前是否正在更改某个商品的收藏状态
    favorites:[], // 用于储存 收藏列表
    errMsg:'', // 用于 储存错误信息
    page:0, //当前页码
  }

  export default function favorite(state=INITIAL_STATE,action){
      switch (action.type) {

        case GET_FAVORITE_REQUEST:
            return{
                ...state, //这个用于复制现有的state
                isLoading:true, // 将 isLoading为 true 代表正在加载
            }
        
        case GET_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoading:false, //加载操作结束
                favorites:state.page>0?[...state.favorites,...action.payload.data]:action.payload.data, // 把 获得到的数据添加到收藏列表里，跟 action 息息相关 仔细观察，每个函数的顺序
                page:action.payload.data.length?action.payload.page+1:state.page
            }
        
        case GET_FAVORITE_FAIL:
            return {
                ...state,
                isLoading:false,
                errMsg:action.payload
            }
        
        case ADD_FAVORITE_REQUEST:
            return {
                ...state,
                isAdding:true,
            }

        case ADD_FAVORITE_SUCCESS:
            return {
                ...state,
                isAdding:false,
                favorites:[action.payload,...state.favorites]
            }
        //TODO:后期可能需要添加一些错误信息
        case ADD_FAVORITE_FAIL:
            return{
                ...state,
                isAdding:false,
            }
        
        case DELETE_FAVORITE_REQUEST:
            return{
                ...state,
                isAdding:true,
            }
        
        case DELETE_FAVORITE_SUCCESS:
            return{
                ...state,
                isAdding:false,
                favorites:state.favorites.filter(fav => fav.id !== action.payload.id)
            }
        
        //TODO:后期可能需要添加一些错误信息
        case DELETE_FAVORITE_FAIL:
            return{
                ...state,
                isAdding:false,
            }

          default:
              return state
              break;
    }

}