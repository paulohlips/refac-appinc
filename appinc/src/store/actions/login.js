export const Creators = {
    getUserName: data => ({
      type: Types.GET_USER_NAME,
      payload: { data },
    }),

    getUserID: data => ({
        type: Types.GET_USER_ID,
        payload: { data },
      }),

    getToken: data => ({
      type: Types.GET_TOKEN,
      payload: { data },
    }),  

  };