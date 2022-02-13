import { Item } from "../typings/common";

interface ITEMLIST_STATE {
  isLoading: boolean;
  updating: boolean;
  itemList: Item[];
  errMsg: string;
}
const INITIAL_STATE: ITEMLIST_STATE = {
  isLoading: false,
  updating: false,
  itemList: [],
  errMsg: "", // 用于 储存错误信息
};

const myItemListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_MYITEMLIST_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_MYITEMLIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        itemList: action.payload,
      };

    case "GET_MYITEMLIST_FAIL":
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
      };

    case "CHANGE_STATUS_REQUEST":
      return {
        ...state,
        updating: true,
      };
    case "CHANGE_STATUS_SUCCESS":
      return {
        ...state,
        updating: false,
        itemList: state.itemList.map((item) =>
          action.payload.id === item.id ? action.payload : item
        ),
      };

    case "CHANGE_STATUS_FAIL":
      return {
        ...state,
        updating: false,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};

export default myItemListReducer;
