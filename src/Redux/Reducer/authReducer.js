const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        authError: "Login failed",
      };
    case "SIGNOUT_SUCCESS":
      return state;
    case "SIGNOUT_FAILED":
      return state;
    default:
      return state;
  }
};

export default authReducer;
