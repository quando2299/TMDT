import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  users: null,
  loading: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UserActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UserActionTypes.EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UserActionTypes.EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UserActionTypes.GET_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case UserActionTypes.GET_ALL_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UserActionTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((item) => {
          if (item._id === action.payload.userId) {
            return {
              ...item,
              role: action.payload.data.role,
              updatedAt: action.payload.data.updatedAt,
            };
          }
          return item;
        }),
        error: null,
      };
    case UserActionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UserActionTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UserActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((item) => item._id !== action.payload),
        error: null,
      };
    case UserActionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
