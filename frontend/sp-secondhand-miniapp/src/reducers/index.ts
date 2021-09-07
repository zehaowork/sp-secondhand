import { combineReducers } from 'redux'
import favorite from './favorite';
import favoriteReducer from '../typings/common'

export default combineReducers({
  favorite,
})

