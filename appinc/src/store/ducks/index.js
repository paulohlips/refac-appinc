import { combineReducers } from 'redux';

import newState from './new';
import formState from './form';
import histState from './hist';
import groupState from './group';
import loginState from './login';
import noteState from './notes';
import infoVeiculoState from './infoVeiculo'
import avariaVeiculoState from './avariaVeiculo'

export default combineReducers({
  newState,
  formState,
  histState,
  groupState,
  loginState,
  noteState,
  infoVeiculoState,
  avariaVeiculoState
});

/*empty: (state = {}) => state,*/
