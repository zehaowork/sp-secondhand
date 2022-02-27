
const categoryReducer = (state = {categoryList: [], errMSG: ''}, action) => {
  switch (action.type){
    case "GET_CATEGORIES_REQUEST":
      return {
        ...state,
      }
    case "GET_CATEGORIES_SUCCESS":
      return {
        ...state,
        categoryList: action.payload
      }
    
    case "GET_CATEGORIES_FAIL":
      return {
        ...state, 
        errMsg:action.payload
      }
    default:
      return state;
  }
}

export default categoryReducer;