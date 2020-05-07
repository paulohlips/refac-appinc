import Api from '../../services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as LoginActions } from '../ducks/login';

export function* getLoginRequest(action) {
  try {
    console.log('response action \n', action)
    const response = yield call(Api.user.loginUser,
      { matricula: action.payload.data.inputSave, pass: action.payload.data.password });
      console.log('response login \n', response)
    
    if (response.status === 206) {
      yield put(LoginActions.getLoginFailure(response.data.mensagem));
    } else {
      yield put(LoginActions.getLoginSucsses(response.data, action.payload.data.inputSave));
    }    
  } catch (err) {
    yield put(LoginActions.getLoginFailure(err));
    console.log('response error \n', err)
  } 
}
