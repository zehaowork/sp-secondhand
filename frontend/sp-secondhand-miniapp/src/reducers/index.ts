import { combineReducers } from "redux";
import favorite from "./favorite";
// import favoriteReducer from '../typings/common'
import myItemList from "./myItemList";
import user from './user';

export default combineReducers({
  favorite,
  myItemList,
  user
});
