import { GET_ITEMS_REQ, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from "src/constants/itemList";

export const FETCH_ITEMS_REQ = () => {
    return {
        type: GET_ITEMS_REQ
    }
}

export const FETCH_ITEMS_SUCCESS = itemList => {
    return {
        type: GET_ITEMS_SUCCESS,
        payload: {
            items: itemList
        }
    }
}

export const FETCH_ITEMS_FAILED = errorMsg => {
    return {
        type: GET_ITEMS_FAILED,
        payload: {
            error: errorMsg 
        }
    }
}

//TODO:没有参数
export const getItemList : any = (baseUrl) => {
    return function (dispatch){
        dispatch(FETCH_ITEMS_REQ)
        Taro.showLoading();
        Taro.request({
            url: baseUrl + 'home/items',
            method:'GET',
            header: {
              'Content-Type': 'application/json;charset=UTF-8',
            },
            success:function(res){
                Taro.hideLoading();
                let itemList = res.data.data;
                dispatch(FETCH_ITEMS_SUCCESS(itemList));
            },
            fail:function(error){
                Taro.hideLoading();
                Taro.showToast({
                    title:'网络不好，请求失败！',
                    icon:'none',
                    duration:2000,
                });
                dispatch(FETCH_ITEMS_FAILED(error.errMsg));
            }
        })
    }
}
