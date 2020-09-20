let initialState = {
  snackbarMessage: "",
  snackbarStatus: false,
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW":
      return {
        snackbarMessage: action.message,
        snackbarStatus: true,
      };
    default:
      return {
        snackbarMessage: "",
        snackbarStatus: false,
      };
  }
};

export default snackbarReducer;
