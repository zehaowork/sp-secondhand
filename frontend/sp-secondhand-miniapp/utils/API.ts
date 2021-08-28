import Taro from '@tarojs/taro';

const BASE_URL:String = 'http://test.smallpotatoestech.com:8087/api/';
const header = 'application/x-www-form-urlencoded';

enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}


const API = {

    SecondHand:{
        getSecondHand: function(data) {
            return Taro.request({
                url:BASE_URL+'secondHand',
                data:data,
                method:Method.GET,
            })
        }
    }

}
export default API;