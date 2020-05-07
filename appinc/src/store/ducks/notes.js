import { AsyncStorage } from 'react-native';

const Types = {
  ADD_NOTE: "notes/ADD_NOTES",
  CREATE_ARRAYNOTES: "note/CREATE_ARRAYNOTES",
  RESET_SAVENOTE: 'note/RESET_SAVENOTE',
  SET_SAVENOTE: 'note/SET_SAVENOTE',
  SAVE_OFFLINE_NOTE: 'note/SAVE_OFFLINE_NOTE',
  RECOVER_STATE_NOTE: 'note/RECOVER_STATE_NOTE'
};

const InitialState = {
  data: [],
  saveNote: null,
};

export default function noteState(state = InitialState, action) {
  switch (action.type) {
    case Types.ADD_NOTE: {
      const updateArrayData = addNoteData(state, action.payload.note);
      return {
        ...state,
        data: updateArrayData,
      }
    }

    case Types.SET_SAVENOTE:
      return {
        ...state,
        saveNote: true,
      };
    case Types.RESET_SAVENOTE:
      return {
        ...state,
        saveNote: false,
      };
    case Types.CREATE_ARRAYNOTES:
      return {
        ...state,
        data: [
          ...state.data,
          action.payload.note
        ],
      };
    case Types.RECOVER_STATE_NOTE:
      return {
        data: action.payload.data.data,
        saveNote: action.payload.data.saveNote,
      }
    case Types.SAVE_OFFLINE_NOTE: {
      saveNoteAsync({
        ref: action.payload.ref,
        matricula: action.payload.matricula,
        state: {
          ...state,
          formEdit: true,
          ref: action.payload.ref
        }
      });
    }
    default:
      return state;
  }
}

export const Creators = {
  creteArrayNotes: note => ({
    type: Types.CREATE_ARRAYNOTES,
    payload: { note }
  }),
  addNote: note => ({
    type: Types.ADD_NOTE,
    payload: { note }
  }),
  setSaveNote: () => ({
    type: Types.SET_SAVENOTE,
  }),
  resetSaveNote: () => ({
    type: Types.RESET_SAVENOTE,
  }),
  // salvar note no asyncstorage
  saveNoteState: (ref, matricula) => ({
    type: Types.SAVE_OFFLINE_NOTE,
    payload: { ref, matricula }
  }),
  // recupera notas do async
  recoverNoteState: data => ({
    type: Types.RECOVER_STATE_NOTE,
    payload: { data }
  })
};

addNoteData = (state, note) => {
  const { data } = state;
  data.map(item => {
    if (item.key === note.key) {
      item.value = note.value;
    }
  })

  return data;
}

const saveNoteAsync = async data => {
  //console.tron.log('savegroupAsync', data);
  const arrayRef = await AsyncStorage.getItem(`arrayRefNote${data.matricula}`);
  //console.tron.log(`arrayRefNote${data.matricula}`, arrayRef);
  let arrayControl = false;
  // verifica se ja existe um array de referencia se nao cria um e ja puxa a primeira referencia pra primeiro campod do array
  if (arrayRef === null) {
    const array = [];
    array.push(data.ref);
    await AsyncStorage.setItem(`arrayRefNote${data.matricula}`, JSON.stringify(array));
    //adiciona o group para diferenciar do form
    //console.tron.log('KEY note', `${data.ref}Note`);
    await AsyncStorage.setItem(`${data.matricula}-${data.ref}Note`, JSON.stringify(data.state));
  } else {
    // caso contrario varre o array pra ver se tem aguma ref caso sim ele so substitui caso nao pussh a ref pro fim do array e os dados
    const array = JSON.parse(arrayRef);
    array.map(item => {
      if (item === data.ref) {
        AsyncStorage.setItem(`${data.matricula}-${data.ref}Note`, JSON.stringify(data.state));
        arrayControl = true;
      }
    });
    if (!arrayControl) {
      array.push(data.ref);
      await AsyncStorage.setItem(`arrayRefNote${data.matricula}`, JSON.stringify(array));
      await AsyncStorage.setItem(`${data.matricula}-${data.ref}Note`, JSON.stringify(data.state));
    }
  }
};