import { combineReducers } from "redux";
import favorite from "./favorite";
import myItemList from "./myItemList";
import user from "./user";
import tabBar from "./tab-bar";
import category from './category'
import city from './city'

export default combineReducers({
  favorite,
  myItemList,
  user,
  tabBar,
  category,
  city
});
