import { takeEvery, call, put } from "redux-saga/effects";
import {
  GET_USER_INFO,
  GET_USER_INFO_COMPLETE,
  GET_USER_INFO_ERROR,
  EDIT_USER_INFO,
  EDIT_USER_INFO_COMPLETE,
  EDIT_USER_INFO_ERROR
} from "../constants";

const baseUrl = "https://api.tavanito.ir/v2";

//******************************************************

export async function fetchUserProfileData(token) {
  let uri = `${baseUrl}/user`;

  return fetch(uri, {
    method: "GET",

    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
}

function* getUserProfileData(action) {
  try {
    const { token } = action;

    const res = yield call(fetchUserProfileData, token);
    yield put({ type: GET_USER_INFO_COMPLETE, data: res.data });
  } catch (err) {
    yield put({ type: GET_USER_INFO_ERROR, err });
  }
}

//************************************************************

export async function editUserProfile(token, data) {
  let uri = `${baseUrl}/user`;
  return fetch(uri, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
}

function* editUserProfileData(action) {
  try {
    const { token, data } = action;

    const res = yield call(editUserProfile, token, data);
    yield put({ type: EDIT_USER_INFO_COMPLETE, data: res.data });
  } catch (err) {
    yield put({ type: EDIT_USER_INFO_ERROR, err });
  }
}

/**********************************************************************/

export const profileSaga = [
  takeEvery(GET_USER_INFO, getUserProfileData),
  takeEvery(EDIT_USER_INFO, editUserProfileData)
];
