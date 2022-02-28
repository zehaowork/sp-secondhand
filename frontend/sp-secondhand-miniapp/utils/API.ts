import Taro from '@tarojs/taro';
import { Item, searchSecondHandParam, getSecondHandByUserParam, toggleFavoriteParam, User } from 'src/typings/common';

//服务器地址
const BASE_URL: string = "http://test.smallpotatoestech.com:8087/api/";
const GOOGLE_MAP_BASE_URL: string = "https://maps.googleapis.com/";
const GOOGLE_MAP_API_KEY: string = "AIzaSyAPHHJa3I5sdAOkJPxL0j3XkuhPkZkQEY4";
const header: String = "application/x-www-form-urlencoded";

enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const API = {
  //二手相关API
  SecondHand: {
    getSecondHands: function (data: searchSecondHandParam) {
      return Taro.request({
        url: BASE_URL + "secondHand",
        data: data,
        header: header,
        method: Method.GET,
      });
    },

    getSecondHand: function (itemId: number) {
      return Taro.request({
        url: BASE_URL + "secondHand/id/" + itemId,
        header: header,
        method: Method.GET,
      });
    },

    getSecondHandByUserId: function (data: getSecondHandByUserParam) {
      return Taro.request({
        url: BASE_URL + "secondHand/user/" + data.userId,
        data: data,
        header: header,
        method: Method.GET,
      });
    },

        // secondhand type ??
        postSecondHand: function(item) {
            return Taro.request({
                url:BASE_URL+'secondHand',
                data:item,
                header:header,
                method:Method.POST,
            })
        },

        modifySecondHand: function(item:Item) {
            return Taro.request({
                url:BASE_URL+'secondHand',
                data:item,
                header:header,
                method:Method.PUT,
            })
        },

    deleteSecondHand: function (itemId: number) {
      return Taro.request({
        url: BASE_URL + "secondHand",
        data: itemId,
        header: header,
        method: Method.DELETE,
      });
    },

    getSecondHandExcludeCity: (data: searchSecondHandParam) => {
      return Taro.request({
        url: BASE_URL + "secondHand/excludeCity",
        data: data,
        header: header,
        method: Method.GET,
      });
    },

    addView: (itemId: number) => {
      return Taro.request({
        url: BASE_URL + "secondHand/views/" + itemId,
        header: header,
        method: Method.GET,
      });
    },

    //通过用户id获取收藏列表
    getFavorites: function (userId: number) {
      return Taro.request({
        url: BASE_URL + "secondHand/favorite/" + userId,
        data: userId,
        header: header,
        method: Method.GET,
      });
    },

    //加入收藏
    postFavorite: function (data: toggleFavoriteParam) {
      return Taro.request({
        url: BASE_URL + "secondHand/favorite",
        data: data,
        header: header,
        method: Method.POST,
      });
    },

    //取消收藏
    deleteFavorite: function (data: toggleFavoriteParam) {
      return Taro.request({
        url:
          BASE_URL +
          "secondHand/favorite?secondHandId=" +
          data.secondHandId +
          "&userId=" +
          data.userId,
        header: header,
        method: Method.DELETE,
      });
    },
  },
  // 主页相关静态资源API
  StaticData: {
    getCategories: function () {
      return Taro.request({
        url: BASE_URL + "staticData/categories",
        header: header,
        method: Method.GET,
      });
    },
    getBanners: () => {
      return Taro.request({
        url: BASE_URL + "staticData/banners",
        header: header,
        method: Method.GET,
      });
    },
    getSearchRecommendations: () => {
      return Taro.request({
        url: BASE_URL + "staticData/recommendedSearch",
        method: Method.GET,
        header: header,
      });
    },
    getCities: () => {
      return Taro.request({
        url: BASE_URL + "staticData/cities",
        method: Method.GET,
        header: header,
      });
    },
  },
  // 地图相关API
  GoogleMaps: {
    getGeocoding: () => {
      return Taro.request({
        url:
          GOOGLE_MAP_BASE_URL +
          "geolocation/v1/geolocate?key=" +
          GOOGLE_MAP_API_KEY,
      });
    },
    getPlaceAutocomplete: (keyword: string) => {
      return Taro.request({
        url:
          GOOGLE_MAP_BASE_URL +
          "maps/api/place/autocomplete/json" +
          "?input=" +
          keyword +
          "&components=country:gb" +
          "&language=zh-CN" +
          "&key=" +
          GOOGLE_MAP_API_KEY,
        method: Method.GET,
        header: header,
      });
    },
    getReverseGeoEncoding: (latlng: string) => {
      return Taro.request({
        url:
          GOOGLE_MAP_BASE_URL +
          "maps/api/geocode/json" +
          "?latlng=" +
          latlng +
          "&language=zh-CN" +
          "&key=" +
          GOOGLE_MAP_API_KEY,
        header: header,
        method: Method.GET,
      });
    },
  },
  // 用户相关API
  User: {
    getOpenId: function (code: string) {
      return Taro.request({
        url: BASE_URL + "user/openId/" + code,
        header: header,
        method: Method.GET,
      });
    },
    signUp: function (data: User) {
      return Taro.request({
        url: BASE_URL + "user",
        header: header,
        method: Method.POST,
        data: data,
      });
    },
  },
};
export default API;
