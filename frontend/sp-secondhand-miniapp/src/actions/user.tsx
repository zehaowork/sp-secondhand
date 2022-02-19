import { User } from "src/typings/common";
import { SAVE_INFO } from "../constants/user";
export const SAVE_USER_INFO = (user:User) => {
  return {
    type: SAVE_INFO,
    payload: user
  };
};
