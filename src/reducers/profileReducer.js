import {
  GET_USER_INFO,
  GET_USER_INFO_COMPLETE,
  GET_USER_INFO_ERROR,
  EDIT_USER_INFO,
  EDIT_USER_INFO_COMPLETE,
  EDIT_USER_INFO_ERROR
} from "../constants";

const initialState = {
  isFetching: false,
  data: {},
  error: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        isFetching: true
      };
    case GET_USER_INFO_COMPLETE:
      return {
        ...state,
        isFetching: false,
        data: action.data
      };
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    //****************************
    case EDIT_USER_INFO:
      return {
        ...state,
        isFetching: true
      };
    case EDIT_USER_INFO_COMPLETE:
      return {
        ...state,
        isFetching: false,
        data: action.data
      };
    case EDIT_USER_INFO_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    default:
      return state;
  }
}
