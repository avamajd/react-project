import { GET_USER_INFO, EDIT_USER_INFO } from "../constants";

export const getUserInfo = token => {
  return {
    type: GET_USER_INFO,
    token
  };
};

export const editUserInfo = (token, data) => {
  return {
    type: EDIT_USER_INFO,
    token,
    data
  };
};
