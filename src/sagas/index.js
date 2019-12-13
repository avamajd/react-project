import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { profileSaga } from "./profileSaga";

function* root() {
  yield all([...authSaga, ...profileSaga]);
}

export default root;
