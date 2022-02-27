import API from "../../utils/API";
import { City } from 'src/typings/common'


const FETCH_CITIES_REQUEST = () =>{
  return {
    type: 'GET_CITIES_REQUEST'
  }
}

const FETCH_CITIES_SUCCESS = (payload) =>{
  return {
    type: 'GET_CITIES_SUCCESS',
    payload: payload
  }
}

const FETCH_CITIES_FAIL = (payload) =>{
  return {
    type: 'GET_CITIES_FAIL',
    payload: payload
  }
}

export const getCityList = ()=>{
  return function(dispatch) {
      dispatch(FETCH_CITIES_REQUEST());
      API.StaticData.getCities()
      .then(res => dispatch(FETCH_CITIES_SUCCESS((res.data.data as City[]).sort((a,b) => a.firstLetter.charCodeAt(0)-b.firstLetter.charCodeAt(0)))))
      .catch(err => dispatch(FETCH_CITIES_FAIL(err)));
  }
}