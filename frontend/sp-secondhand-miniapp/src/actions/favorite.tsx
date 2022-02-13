import API from "../../utils/API";
import {
  GET_FAVORITE_REQUEST,
  GET_FAVORITE_FAIL,
  GET_FAVORITE_SUCCESS,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAIL,
  DELETE_FAVORITE_REQUEST,
  DELETE_FAVORITE_SUCCESS,
  DELETE_FAVORITE_FAIL,
} from "../constants/favorite";
import { Item } from "src/typings/common";

/**
 *
 * @returns 返回action类型，reducer根据类型更改state
 */
const FETCH_FAVORITE_REQUEST = () => {
  return {
    type: GET_FAVORITE_REQUEST,
  };
};

/**
 *
 * @param payload 请求返回的数据对象
 * @returns 返回数据对象和action类型给reducer
 */
const FETCH_FAVORITE_SUCCESS = (payload) => {
  return {
    type: GET_FAVORITE_SUCCESS,
    payload: payload,
  };
};

/**
 *
 * @param payload 请求失败返回的错误信息对象
 * @returns 返回错误信息的对象和action类型给reducer
 */
const FETCH_FAVORITE_FAIL = (payload) => {
  return {
    type: GET_FAVORITE_FAIL,
    payload: payload,
  };
};

/**
 *
 *
 * @returns 根据不同的情况返回相应的action类型
 */
export const getFavoriteList = (userId: number) => {
  return function (dispatch) {
    dispatch(FETCH_FAVORITE_REQUEST());
    API.SecondHand.getFavorites(userId)
      .then((res) => dispatch(FETCH_FAVORITE_SUCCESS(res.data.data)))
      .catch((err) => dispatch(FETCH_FAVORITE_FAIL(err)));
  };
};

const POST_FAVORITE_REQUEST = () => {
  return {
    type: ADD_FAVORITE_REQUEST,
  };
};

const POST_FAVORITE_SUCCESS = (payload: any) => {
  return {
    type: ADD_FAVORITE_SUCCESS,
    payload: payload,
  };
};

const POST_FAVORITE_FAIL = (payload: any) => {
  return {
    type: ADD_FAVORITE_FAIL,
    payload: payload,
  };
};

export const addFavorite = (data: { userId: number; item: Item }) => {
  return function (dispatch) {
    dispatch(POST_FAVORITE_REQUEST());
    API.SecondHand.postFavorite({
      userId: data.userId,
      secondHandId: data.item.id,
    })
      .then((res) =>
        res.statusCode === 200
          ? dispatch(POST_FAVORITE_SUCCESS(data.item))
          : dispatch(POST_FAVORITE_FAIL(res.data.data))
      )
      .catch((err) => dispatch(POST_FAVORITE_FAIL(err)));
  };
};

const DEL_FAVORITE_REQUEST = () => {
  return {
    type: DELETE_FAVORITE_REQUEST,
  };
};

const DEL_FAVORITE_SUCCESS = (payload: Item) => {
  return {
    type: DELETE_FAVORITE_SUCCESS,
    payload: payload,
  };
};

const DEL_FAVORITE_FAIL = (payload: any) => {
  return {
    type: DELETE_FAVORITE_FAIL,
    payload: payload,
  };
};

export const deleteFavorite = (data: { userId: number; item: Item }) => {
  return function (dispatch) {
    dispatch(DEL_FAVORITE_REQUEST());
    API.SecondHand.deleteFavorite({
      userId: data.userId,
      secondHandId: data.item.id,
    })
      .then((res) =>
        res.statusCode === 200
          ? dispatch(DEL_FAVORITE_SUCCESS(data.item))
          : dispatch(DEL_FAVORITE_FAIL(res.data.data))
      )
      .catch((err) => dispatch(DEL_FAVORITE_FAIL(err)));
  };
};
