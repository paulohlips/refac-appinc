import { AsyncStorage } from 'react-native';
//import store from '../index';

const Types = {
  CREATE_FORM: 'form/CREATE_SAVE',
  SAVE_FORM_STATE: 'form/SAVE_FORM_STATE',
  START_SAVE_STEP: 'form/SAVE_STEP_STATE',
  STOP_SAVE_STEP: 'form/STOP_SAVE_STEP',
  START_CONTROL_ARRAY: 'form/START_CONTROL_ARRAY',
  SAVE_FORM: 'form/SAVE_FORM',
  START_UPDATE_PROGRESS: 'form/UPDATE_PROGRESS',
  FINISH_UPDATE_PROGRESS: 'form/FINISH_UPDATE_PROGRESS',
  RESTORE_FORM: 'form/RESTORE_FORM',
  SAVE_CONTENT_FORM: 'form/SAVE_CONTENT_FORM',
  RESET_EDIT_FORM: 'form/RESET_EDIT_FORM',
};

const initialState = {
  saveStep: null,
  controlArraySize: null,
  updateProgress: false,
  step: {},
  form: null,
  formEdit: false,
  ref: '',
};

export default function formState(state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_FORM:
      return { ...state, step: { ...state.step, ...action.payload.data } };
    case Types.SAVE_FORM_STATE:
      return { ...state, step: { ...state.step, ...action.payload.data } };
    case Types.SAVE_CONTENT_FORM:
      return { ...state, form: action.payload.form, };
    case Types.START_SAVE_STEP:
      return { ...state, saveStep: true };
    case Types.STOP_SAVE_STEP:
      return { ...state, saveStep: false };
    case Types.START_CONTROL_ARRAY: {
      const status = controlArraySte(state);
      if (!state.controlArraySize) {

        return { ...state, controlArraySize: status };
      }
      if (!status) {
        return { ...state, saveStep: status, controlArraySize: null };
      }
      return { ...state, controlArraySize: status };
    }
    case Types.SAVE_FORM: {
      saveFormAsync({ 
        ref: action.payload.ref,
        matricula: action.payload.matricula,
        state: { 
          ...state, 
          formEdit: true, 
          ref: action.payload.ref,          
        }
      });
      return state;
    }
    case Types.START_UPDATE_PROGRESS:
      return { ...state, updateProgress: true };
    case Types.FINISH_UPDATE_PROGRESS:
      return { ...state, updateProgress: false };
    case Types.RESTORE_FORM:
      return {
        ...state,
        step: action.payload.form.step,
        form: action.payload.form.form,
        formEdit: action.payload.form.formEdit,
        ref: action.payload.form.ref,
      };
    case Types.RESET_EDIT_FORM:
      return { ...state, formEdit: false };
    default:
      return state;
  }
}

export const Creators = {
  // cria todos os campos do formularios na variavel step
  getCreateForm: data => ({
    type: Types.CREATE_FORM,
    payload: { data }
  }),
  setSaveContentForm: form => ({
    type: Types.SAVE_CONTENT_FORM,
    payload: { form }
  }),
  // inicial o processo de savar os valores recolhidos no step
  saveStepState: () => ({
    type: Types.START_SAVE_STEP
  }),
  // inicia o controle de array para ter uma condição de parada
  startControlArray: () => ({
    type: Types.START_CONTROL_ARRAY,
  }),
  stopSaveStep: () => ({
    type: Types.STOP_SAVE_STEP
  }),
  getSaveStateForm: data => ({
    type: Types.SAVE_FORM_STATE,
    payload: { data }
  }),
  // salva o formulario  no asyncstorage com o nome de referencia
  saveForm: (ref, matricula) => ({
    type: Types.SAVE_FORM,
    payload: { ref, matricula }
  }),
  startUpdateProgress: () => ({
    type: Types.START_UPDATE_PROGRESS,
  }),
  finishUpdateProgress: () => ({
    type: Types.FINISH_UPDATE_PROGRESS,
  }),
  restoreFormState: form => ({
    type: Types.RESTORE_FORM,
    payload: { form }
  }),
  resetEditForm: () => ({
    type: Types.RESET_EDIT_FORM,
  })
};


// controla o tamano do array step
const controlArraySte = state => {
  const arraySize = state.controlArraySize;
  // caso seja null ele pega o tamnho do arra step e retorna
  if (!arraySize) {
    const step = state.step;
    const size = Object.keys(step).length;
    return size;
  }
  // diminui o valor da variavel controlArraySize em 1 toda vez que a função e chamada e retorna o novo valor
  const size2 = arraySize - 1;
  if (size2 === 0) {
    return false;
  }
  return size2;
};

const saveFormAsync = async data => {
  const arrayRef = await AsyncStorage.getItem(`arrayRef${data.matricula}`);
  let arrayControl = false;
  // verifica se ja existe um array de referencia se nao cria um e ja puxa a primeira referencia pra primeiro campod do array
  if (arrayRef === null) {
    const array = [];
    array.push(data.ref);
    await AsyncStorage.setItem(`arrayRef${data.matricula}`, JSON.stringify(array));
    await AsyncStorage.setItem(`${data.matricula}-${data.ref}`, JSON.stringify(data.state));
  } else {
    // caso contrario varre o array pra ver se tem aguma ref caso sim ele so substitui caso nao pussh a ref pro fim do array e os dados
    const array = JSON.parse(arrayRef);
    array.map(item => {
      if (item === data.ref) {
        AsyncStorage.setItem(`${data.matricula}-${data.ref}`, JSON.stringify(data.state));
        arrayControl = true;
      }
    });
    if (!arrayControl) {
      array.push(data.ref);
      await AsyncStorage.setItem(`arrayRef${data.matricula}`, JSON.stringify(array));
      await AsyncStorage.setItem(`${data.matricula}-${data.ref}`, JSON.stringify(data.state));
    }
  }
};
