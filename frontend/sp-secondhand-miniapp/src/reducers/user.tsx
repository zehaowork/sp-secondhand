import { User } from "src/typings/common";
import { SAVE_INFO } from "../constants/user";

interface USER_STATE {
  user: User | undefined;
}

const INITIAL_STATE: USER_STATE = {
  user: undefined,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_INFO:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
