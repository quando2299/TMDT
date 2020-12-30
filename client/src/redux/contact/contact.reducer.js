import { ContactActionTypes } from "./contact.types";

const INITIAL_STATE = {
  feedbacks: [],
  loading: false,
  error: null,
};

const contactReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContactActionTypes.FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ContactActionTypes.CREATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ContactActionTypes.CREATE_FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ContactActionTypes.GET_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ContactActionTypes.GET_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedbacks: action.payload,
        loading: false,
        error: null,
      };
    case ContactActionTypes.GET_FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
