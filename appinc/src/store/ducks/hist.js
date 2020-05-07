export const Types = {
    SET_UPDATE_HISTORY: 'hist/SET_UPDATE_HISTORY',
    RESET_UPDATE_HISTORY: 'hist/RESET_UPDATE_HISTORY',
};

const INITIAL_STATE = {
    updateHistory: false,
};

export default function histState(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.SET_UPDATE_HISTORY:
            return { ...state, updateHistory: true };
        case Types.RESET_UPDATE_HISTORY:
            return { ...state, updateHistory: false };   
        default:
            return state;
    }
}

export const Creators = {
    setUpdateHistory: () => ({
        type: Types.SET_UPDATE_HISTORY,
    }),
    resetUpdateHistory: () => ({
        type: Types.RESET_UPDATE_HISTORY,
    }),
};
