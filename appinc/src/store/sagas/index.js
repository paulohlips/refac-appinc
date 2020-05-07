import { all, takeLatest } from 'redux-saga/effects';

import { Types as NewActions } from '../ducks/new';
import { Types as LoginActions } from '../ducks/login';

import { getNewRequest } from './new';
import { getLoginRequest } from './login';

export default function* rootSaga() {
  return yield all([
    takeLatest(NewActions.GET_REQUEST, getNewRequest),
    takeLatest(LoginActions.GET_REQUEST_LOGIN, getLoginRequest),
  ]);
}
