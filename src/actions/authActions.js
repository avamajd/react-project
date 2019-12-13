import { LOGIN, SET_TOKEN, LOGOUT } from "../constants";

export const login = username => {
  return {
    type: LOGIN,
    username
  };
};

// send otp and fetch token
export const setToken = otp => {
  return {
    type: SET_TOKEN,
    otp
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
