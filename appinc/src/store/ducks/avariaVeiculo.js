export const Types = {
  SET_CHECKBOX_STATE: "avariaVeiculoState/SET_CHECKBOX_STATE",
  START_UPDATE_PROGRESS: 'form/UPDATE_PROGRESS',
  FINISH_UPDATE_PROGRESS: 'form/FINISH_UPDATE_PROGRESS',
};

const INITIAL_STATE = {
  checked1: false,
  checked2: false,
  checked3: false,
  checked4: false,
  checked5: false,

  checked6: false,
  checked7: false,
  checked8: false,
  checked9: false,
  checked10: false,
  checked11: false,
  checked12: false,

};

export default function avariaVeiculoState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.START_UPDATE_PROGRESS:
      return { ...state, updateProgress: true };
    case Types.FINISH_UPDATE_PROGRESS:
      return { ...state, updateProgress: false };
    case Types.SET_CHECKBOX_STATE:
      const { data } = action;
      return {
        ...state,
        checked1: data.checked1,
        checked2: data.checked2,
        checked3: data.checked3,
        checked4: data.checked4,
        checked5: data.checked5,
        checked6: data.checked6,
        checked7: data.checked7,
        checked8: data.checked8,
        checked9: data.checked9,
        checked10: data.checked10,
        checked11: data.checked11,
        checked12: data.checked12,
        
      };
    default:
      return state;
  }
}

export const Creators = {
  setavariaVeiculoState: (data) => ({
    type: Types.SET_CHECKBOX_STATE,
    data,
  }),
  startUpdateProgress: () => ({
    type: Types.START_UPDATE_PROGRESS,
  }),
  finishUpdateProgress: () => ({
    type: Types.FINISH_UPDATE_PROGRESS,
  }),
};
