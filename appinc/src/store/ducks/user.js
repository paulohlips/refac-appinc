const Types = {
    USER_REQUEST: 'user/USER_REQUEST',
    USER_SUCCESS: 'user/USER_REQUEST',
    USER_FAILURE: 'user/USER_FAILURE',
};

export const Creators = {
    getRequestUser: (data) => ({
        type: Types.USER_REQUEST,
        payload: { data }
    }),
};
