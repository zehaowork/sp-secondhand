import Taro from '@tarojs/taro';
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
        getSecondHands: function(data) {
            return Taro.request({
                url:BASE_URL+'secondHand',
                data:data,
                header:header,
                method:Method.GET,
            })
        },
        getSecondHand: function(data) {
            
        }
    }

}
export default API;