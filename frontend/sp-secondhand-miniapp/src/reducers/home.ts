import { GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_REQUEST, GET_CATEGORY_LIST_FAIL, GET_CITY_LIST_SUCCESS } from '../constants/home'

const INITIAL_STATE = {
  categoryList: [],
  cityList: []
}

export default function home (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: action.payload
      }
    
    case GET_CITY_LIST_SUCCESS:
      return {
        ...state,
        cityList: action.payload
      }

     default:
       return state
  }
}
