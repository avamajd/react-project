import {
  LOGIN,
  LOGIN_COMPLETE,
  LOGIN_ERROR,
  SET_USERNAME,
  SET_USERNAME_ERROR,
  SET_TOKEN,
  SET_TOKEN_COMPLETE,
  SET_TOKEN_ERROR,
  LOGOUT
} from "../constants";
// import { REHYDRATE } from "redux-persist/es/constants";

import { persist } from "../store/persist";

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  // username -> phone#
  username: "",
  token: "",
  error: "",
  message: ""
};

export const authReducer = function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isFetching: true,
        error: ""
      };
    case LOGIN_COMPLETE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
        // error: action.error
      };

    case SET_USERNAME:
      return {
        ...state,
        isFetching: false,
        username: action.username,
        message: action.message
      };
    case SET_USERNAME_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case SET_TOKEN:
      return {
        ...state,
        isFetching: true,
        error: ""
      };
    case SET_TOKEN_COMPLETE:
      return {
        ...state,
        isFetching: false,
        token: action.token
      };
    case SET_TOKEN_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case LOGOUT:
      return {
        ...initialState
      };

    // case REHYDRATE:
    //   return state.token  && state.username ? { ...state } : {};

    default:
      return state;
  }
};

export default persist("authReducer", ["token"], authReducer);
