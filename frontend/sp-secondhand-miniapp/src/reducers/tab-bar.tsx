import { SET_INDEX } from "../constants/tab-bar";

const INITIAL_STATE = {
  selected: 0,
};

export default function tabBar(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_INDEX:
      return {
        ...state,
        selected: action.payload,
      };
      break;
    default:
      return state;
      break;
  }
}
