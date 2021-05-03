const initState = {
  token: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return { ...state, token: action.token };
    case "AUTH_LOGOUT":
      return { ...state, token: null };
    default:
      return state;
  }
};

export default authReducer;
