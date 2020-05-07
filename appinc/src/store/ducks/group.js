import { AsyncStorage } from 'react-native';


const Types = {
  ICREMENT_DATA_GROUP: "group/ICREMENT_DATA_GROUP",
  DECREMENT_DATA_GROUP: "group/DECREMENT_DATA_GROUP",
  SAVE_DATA_GROUP: "group/SAVE_DATA_GROUP",
  FLAG_DATA_GROUP: "group/FLAG_DATA_GROUP",
  CREATE_DATA_GROUP: "group/CREATE_DATA_GROUP",
  CONTROLL_ARRAY_GROUP: "group/CONTROLL_ARRAY_GROUP",
  RESET_UPDATE_VIEW: "group/RESET_UPDATE_VIEW",

  SAVE_OFFLINE_GROUP: "group/SAVE_OFFLINE_GROUP",
  RECOVER_STATE_GROUP: "group/RECOVER_STATE_GROUP"
};

const INITIAL_STATE = {
  dataGroup: [],
  flagGroup: null,
  arrayGroupSize: 0,
  updateViewGroup: true,
};

export default function groupState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE_DATA_GROUP:
      return {
        ...state,
        dataGroup: [
          ...state.dataGroup,
          {
            key: action.payload.key,
            prototype: action.payload.prototype,
            value: [
              {
                ...action.payload.prototype,
                index: Math.random()
              }
            ]
          }
        ]
      };
    case Types.ICREMENT_DATA_GROUP: {
      const arrayDataGroup = increment(action.payload.groupName, state);
      return {
        ...state,
        dataGroup: arrayDataGroup
      };
    }
    case Types.DECREMENT_DATA_GROUP: {
      const array = decrement(action.payload.id, action.payload.groupName, state);
      return { ...state, dataGroup: array, updateViewGroup: true };
    }
    case Types.SAVE_DATA_GROUP: {
      // console.log(['action save', action.payload.data]);
      const array = saveData(action.payload.data, state);
      // console.log(['return function', array]);
      return { ...state, dataGroup: array };
    }
    case Types.FLAG_DATA_GROUP: {
      //const size = controlArray(state);
      return { ...state, flagGroup: true };
    }
    case Types.CONTROLL_ARRAY_GROUP: {
      const status = controlArray(state, action.payload.data_name);
      if (!state.flagGroup) {
        return { ...state, flagGroup: status };
      }
      return { ...state, flagGroup: status };
    }
    case Types.RESET_UPDATE_VIEW: {
      return { ...state, updateViewGroup: false }
    }
    case Types.RECOVER_STATE_GROUP: {
      return {
        dataGroup: action.payload.data.dataGroup,
        flagGroup: action.payload.data.flagGroup,
        arrayGroupSize: action.payload.data.arrayGroupSize,
        updateViewGroup: action.payload.data.updateViewGroup,
      }
    }
    case Types.SAVE_OFFLINE_GROUP: {
      saveGroupAsync({
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
  createDataGroup: (key, prototype) => ({
    type: Types.CREATE_DATA_GROUP,
    payload: { key, prototype }
  }),
  incrementDataGroup: groupName => ({
    type: Types.ICREMENT_DATA_GROUP,
    payload: { groupName }
  }),
  decrementDataGroup: (id, groupName) => ({
    type: Types.DECREMENT_DATA_GROUP,
    payload: { id, groupName }
  }),
  saveDataGroup: data => ({
    type: Types.SAVE_DATA_GROUP,
    payload: { data }
  }),
  activeFlag: () => ({
    type: Types.FLAG_DATA_GROUP
  }),
  startControlArrayGroup: data_name => ({
    type: Types.CONTROLL_ARRAY_GROUP,
    payload: { data_name }
  }),
  resetUpdateView: () => ({
    type: Types.RESET_UPDATE_VIEW,
  }),
  // salva o GROUP  no asyncstorage com o nome de referencia
  saveGroup: (ref, matricula) => ({
    type: Types.SAVE_OFFLINE_GROUP,
    payload: { ref, matricula }
  }),
  // recupera o group save
  recoverGroupState: data => ({
    type: Types.RECOVER_STATE_GROUP,
    payload: { data }
  })
};

const increment = (groupName, state) => {
  var arrayState = state.dataGroup;
  arrayState.map(group => {
    if (group.key === groupName) {
      group.value.push({
        ...group.prototype,
        index: Math.random()
      });
    }
  });

  return arrayState;
};

const decrement = (id, groupMother, state) => {
  var arrayState = state.dataGroup;
  let count = 0;

  arrayState.map(group => {
    if (group.key === groupMother) {
      group.value.map(item => {
        if (item.index === id) {
          group.value.splice(count, 1)
        }
        count += 1;
      })
    }
  });
  return arrayState;
};

const saveData = (info, state) => {
  const { index, groupMother, name, data, extra } = info;
  var arrayState = state.dataGroup;

  arrayState.map(group => {
    if (group.key === groupMother) {
      group.value.map(itemGroup => {
        if (itemGroup.index === index) {
          Object.keys(itemGroup).map(keyName => {
            if (keyName === name) {
              itemGroup[keyName] = {
                key: keyName,
                value: data,
                filled: true,
                extra,
              };
            }
          });
        }
      });
    }
  });
  return arrayState;
};

const controlArray = (state, name) => {
  const arrayGroup = state.flagGroup;

  if (arrayGroup === true) {
    let count = 0;
    const dataGroup = state.dataGroup;
    dataGroup.map(item => {
      item.value.map(item2 => {
        Object.keys(item2).map(key => {
          if (key !== 'index') {
            count += 1;
          }
        });
      });
    });
    return count;
  }

  const size2 = arrayGroup - 1;

  if (size2 === 0) {
    return false;
  }

  return size2;

};

// save group async
const saveGroupAsync = async data => {
  // console.tron.log('savegroupAsync', data);
  const arrayRef = await AsyncStorage.getItem(`arrayRefGroup${data.matricula}`);
  //console.tron.log(`arrayRefGroup${data.matricula}`, arrayRef);
  let arrayControl = false;
  // verifica se ja existe um array de referencia se nao cria um e ja puxa a primeira referencia pra primeiro campod do array
  if (arrayRef === null) {
    const array = [];
    array.push(data.ref);
    await AsyncStorage.setItem(`arrayRefGroup${data.matricula}`, JSON.stringify(array));
    //adiciona o group para diferenciar do form
    //console.tron.log('KEY group', `${data.ref}Group`);
    await AsyncStorage.setItem(`${data.matricula}-${data.ref}Group`, JSON.stringify(data.state));
  } else {
    // caso contrario varre o array pra ver se tem aguma ref caso sim ele so substitui caso nao pussh a ref pro fim do array e os dados
    const array = JSON.parse(arrayRef);
    array.map(item => {
      if (item === data.ref) {
        AsyncStorage.setItem(`${data.matricula}-${data.ref}Group`, JSON.stringify(data.state));
        arrayControl = true;
      }
    });
    if (!arrayControl) {
      array.push(data.ref);
      await AsyncStorage.setItem(`arrayRefGroup${data.matricula}`, JSON.stringify(array));
      await AsyncStorage.setItem(`${data.matricula}-${data.ref}Group`, JSON.stringify(data.state));
    }
  }
};