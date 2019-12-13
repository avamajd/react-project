import { takeEvery, call, put, take, fork } from "redux-saga/effects";
import {
  LOGIN,
  LOGIN_COMPLETE,
  LOGIN_ERROR,
  SET_TOKEN,
  SET_TOKEN_COMPLETE,
  SET_TOKEN_ERROR,
  SET_USERNAME,
  SET_USERNAME_ERROR
} from "../constants";
// import jwt_decode from "jwt-decode";

const baseUrl = "https://api.tavanito.ir/v2";

async function login(mobile) {
  let uri = `${baseUrl}/login/otp`;

  const res = await fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mobile
    })
  });
  return await res.json();
}

async function fetchToken(otp, mobile) {
  let uri = `${baseUrl}/login?mobile=${mobile}&code=${otp}`;

  const res = await fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mobile
    })
  });
  return await res.json();
}

function* authFlow() {
  while (true) {
    // try {
    let loop = true;
    let username;
    while (loop) {
      const loginAction = yield take(LOGIN);
      username = loginAction.username;
      const res = yield call(login, username);

      if (res.message) {
        yield put({ type: SET_USERNAME, username, message: res.message });
        loop = false;
      } else if (res.errors && res.errors.mobile.length !== 0) {
        yield put({ type: SET_USERNAME_ERROR, error: res.errors.mobile[0] });
      }
    }

    while (true) {
      const tokenAction = yield take(SET_TOKEN);
      // otp -> verify code
      const { otp } = tokenAction;
      const result = yield call(fetchToken, otp, username);

      if (result.access_token && result.access_token !== "") {
        yield put({ type: SET_TOKEN_COMPLETE, token: result.access_token });
        yield put({ type: LOGIN_COMPLETE });
      } else if (result.errors && result.errors.mobile.length !== 0) {
        yield put({ type: SET_TOKEN_ERROR, error: result.errors.mobile[0] });
        yield put({ type: LOGIN_ERROR });
      }
    }
  }
}

/**********************************************************************/

export const authSaga = [fork(authFlow)];
