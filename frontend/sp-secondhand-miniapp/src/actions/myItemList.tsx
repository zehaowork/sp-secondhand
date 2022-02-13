import { Item } from "src/typings/common";
import API from "../../utils/API";

const FETCH_MYITEMLIST_REQUEST = () => {
  return {
    type: "GET_MYITEMLIST_REQUEST",
  };
};

const FETCH_MYITEMLIST_SUCCESS = (payload) => {
  return {
    type: "GET_MYITEMLIST_SUCCESS",
    payload: payload,
  };
};

const FETCH_MYITEMLIST_FAIL = (payload) => {
  return {
    type: "GET_MYITEMLIST_FAIL",
    payload: payload,
  };
};

export const getMyItemList = (userId: number) => {
  return function (dispatch) {
    dispatch(FETCH_MYITEMLIST_REQUEST());
    API.SecondHand.getSecondHandByUserId({
      userId: userId,
      page: 0,
      size: 20,
    })
      .then((res) => dispatch(FETCH_MYITEMLIST_SUCCESS(res.data.data)))
      .catch((err) => dispatch(FETCH_MYITEMLIST_FAIL(err)));
  };
};

const CHANGE_STATUS_REQUEST = () => {
  return {
    type: "CHANGE_STATUS_REQUEST",
  };
};

const CHANGE_STATUS_SUCCESS = (payload) => {
  return {
    type: "CHANGE_STATUS_SUCCESS",
    payload: payload,
  };
};

const CHANGE_STATUS_FAIL = (payload) => {
  return {
    type: "CHANGE_STATUS_FAIL",
    payload: payload,
  };
};

export const updateItemStatus = (item: Item, status) => {
  return function (dispatch) {
    dispatch(CHANGE_STATUS_REQUEST());
    API.SecondHand.modifySecondHand({ ...item, status: status })
      .then((res) => {
        if (res.statusCode === 200) {
          dispatch(CHANGE_STATUS_SUCCESS(res.data.data));
        } else {
          dispatch(CHANGE_STATUS_FAIL(res.data.data));
        }
      })
      .catch((err) => dispatch(CHANGE_STATUS_FAIL(err)));
  };
};

const DELETE_ITEM_REQUEST = () => {
  return {
    type: "DELETE_ITEM_REQUEST",
  };
};

const DELETE_ITEM_SUCCESS = (payload) => {
  return {
    type: "DELETE_ITEM_SUCCESS",
    payload: payload,
  };
};

const DELETE_ITEM_FAIL = (payload) => {
  return {
    type: "DELETE_ITEM_FAIL",
    payload: payload,
  };
};

export const deleteItem = (itemId: number) => {
  return function (dispatch) {
    dispatch(DELETE_ITEM_REQUEST());
    API.SecondHand.deleteSecondHand(itemId)
      .then((res) => {
        if (res.statusCode === 200) {
          dispatch(DELETE_ITEM_SUCCESS(res.data.data));
        } else {
          dispatch(DELETE_ITEM_FAIL(res.data.data));
        }
      })
      .catch((err) => dispatch(CHANGE_STATUS_FAIL(err)));
  };
};
