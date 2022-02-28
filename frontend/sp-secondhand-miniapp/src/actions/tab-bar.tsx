import { SET_INDEX } from "../constants/tab-bar";

export const changeIndex = (index) => {
  return {
    type: SET_INDEX,
    payload: index,
  };
};
