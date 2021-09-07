import { GET_FAVORITE_FAIL, GET_FAVORITE_REQUEST, GET_FAVORITE_SUCCESS } from "../constants/favorite";


const INITIAL_STATE = {
    isLoading:false, //用来条件渲染 loading bar
    favorites:[], // 用于储存 收藏列表
    errMsg:'', // 用于 储存错误信息
  }

  export default function favorite(state=INITIAL_STATE,action){
      switch (action.type) {

        case GET_FAVORITE_REQUEST:
            return{
                ...state, //这个用于复制现有的state
                isLoading:false, // 将 isLoading为 true 代表正在加载
            }
        
        case GET_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoading:true, //加载操作结束
                favorites:action.payload, // 把 获得到的数据添加到收藏列表里，跟 action 息息相关 仔细观察，每个函数的顺序
            }
        
        case GET_FAVORITE_FAIL:
            return {
                ...state,
                isLoading:false,
                errMsg:action.payload
            }
            
          default:
              return state
              break;
    }

}