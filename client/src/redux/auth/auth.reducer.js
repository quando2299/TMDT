import { AuthActionTypes } from "./auth.types";

const INITIAL_STATE = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isAuthenticate: false,
  loading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticate: true,
        loading: false,
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticate: false,
        loading: false,
      };
    case AuthActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticate: false,
        user: {},
      };
    case AuthActionTypes.UPDATE_AUTH:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
