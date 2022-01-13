import { combineReducers } from 'redux'
import favorite from './favorite';
// import favoriteReducer from '../typings/common'
import myItemListReducer from './myItemList';
import categoryReducer from './categories';
import cityReducer from './cities';

export default combineReducers({
  favorite,
  myItemList : myItemListReducer,
  categoryList : categoryReducer,
  cityList: cityReducer
})

