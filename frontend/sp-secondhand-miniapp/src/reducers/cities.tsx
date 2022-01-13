import { City } from "src/typings/common";

interface CITYLIST_STATE {
  isLoading:boolean;
  cityList:City[];
  errMsg:string;
}

const INITIAL_STATE:CITYLIST_STATE = {
  isLoading:false,
  cityList:[],
  errMsg:'', 
}

const cityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type){
    case "GET_CITIES_REQUEST":
      return {
        ...state,
        isLoading:true,
      }
    case "GET_CITIES_SUCCESS":
      return {
        ...state,
        isLoading:false,
        cityList: action.payload
      }
    
    case "GET_CITIES_FAIL":
      return {
        ...state, 
        isLoading:false,
        errMsg:action.payload
      }
    default:
      return state;
  }
}

export default cityReducer;