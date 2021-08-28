import { combineReducers } from 'redux'
import counter from './counter'
import itemList from './itemList'

export default combineReducers({
  counter,
  itemList
})
