import Api from '../../services/api';
import { call, put, select } from 'redux-saga/effects';

import { Creators as NewActions } from '../ducks/new';


export function* getNewRequest(action, state) {
  try {
    const response = yield call(Api.form.getNewForm, action.payload.number);    
    yield put(NewActions.getNewSucsses(response.data));
  } catch (erro) {
    yield put(NewActions.getNewFailure('Não foi possivel carregar o formulario'));
  }
}

//action.payload.number