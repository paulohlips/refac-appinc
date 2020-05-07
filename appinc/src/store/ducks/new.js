export const Types = {
  GET_REQUEST: 'new/GET_REQUEST',
  GET_SUCSSES: 'new/GET_SUCSSES',
  GET_FAILURE: 'new/GET_FAILURE',
  GET_REFERENCE: 'new/GET_REFERENCE',
  SET_FORM: 'new/SET_FORM',
  CLOSE_MODAL_ERROR: 'new/CLOSE_MODAL_ERROR',
};

const InitialState = {
  data: [],
  erro: null,
  load: false,
  sucsses: false,
  form: 'sjahdjkashdkashd',
  reference: null,
  showButton: null,
  number: null,
};

export default function newState(state = InitialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, load: true, number: action.payload.number };
    case Types.GET_SUCSSES:
      return { ...state, data: action.payload.data, load: false, sucsses: true, showButton: true };
    case Types.GET_FAILURE:
      return { ...state, erro: true, load: false };
    case Types.GET_REFERENCE:
      return { ...state, reference: action.payload.ref };
    case Types.SET_FORM:
      return { ...state, data: action.payload.data };
    case Types.CLOSE_MODAL_ERROR:
      return { ...state, erro: false, load: false };
    default:
      return state;
  }
}

export const Creators = {
  getNewRequest: number => ({
    type: Types.GET_REQUEST,
    payload: { number },
  }),
  getNewSucsses: data => ({
    type: Types.GET_SUCSSES,
    payload: { data },
  }),
  getNewFailure: () => ({
    type: Types.GET_FAILURE,
  }),
  getReference: ref => ({
    type: Types.GET_REFERENCE,
    payload: { ref },
  }),
  setForm: data => ({
    type: Types.SET_FORM,
    payload: { data },
  }),
  closeModalError: () => ({
    type: Types.CLOSE_MODAL_ERROR,
  }),
};
