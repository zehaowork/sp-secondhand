import API from "../../utils/API";

const FETCH_CATEGORIES_REQUEST = () =>{
  return {
    type: 'GET_CATEGORIES_REQUEST'
  }
}

const FETCH_CATEGORIES_SUCCESS = (payload) =>{
  return {
    type: 'GET_CATEGORIES_SUCCESS',
    payload: payload
  }
}

const FETCH_CATEGORIES_FAIL = (payload) =>{
  return {
    type: 'GET_CATEGORIES_FAIL',
    payload: payload
  }
}

export const getCategoryList = ()=>{
  return function(dispatch) {
      dispatch(FETCH_CATEGORIES_REQUEST());
      API.StaticData.getCategories()
      .then(res => dispatch(FETCH_CATEGORIES_SUCCESS(res.data.data)))
      .catch(err => dispatch(FETCH_CATEGORIES_FAIL(err)));
  }
}