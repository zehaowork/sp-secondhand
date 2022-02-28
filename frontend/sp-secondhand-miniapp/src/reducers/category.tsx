import { Category } from "src/typings/common";

interface CATEGORIES_STATE {
  categoryList: Array<Category>;
  errMsg: string;
}

const INITIAL_STATE: CATEGORIES_STATE = {
  categoryList: [],
  errMsg: "",
};

export default function category(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_CATEGORIES_REQUEST":
      return {
        ...state,
      };
    case "GET_CATEGORIES_SUCCESS":
      return {
        ...state,
        categoryList: action.payload,
      };

    case "GET_CATEGORIES_FAIL":
      return {
        ...state,
        errMsg: action.payload,
      };
    default:
      return state;
  }
}

