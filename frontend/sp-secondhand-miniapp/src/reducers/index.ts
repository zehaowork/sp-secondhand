import { combineReducers } from "redux";
import favorite from "./favorite";
// import favoriteReducer from '../typings/common'
import myItemListReducer from "./myItemList";

export default combineReducers({
  favorite,
  myItemList: myItemListReducer,
});
