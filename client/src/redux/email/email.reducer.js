import { EmailActionTypes } from "./email.types";

const INITIAL_STATE = {
  loading: false,
  error: null,
};

const EmailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EmailActionTypes.SEND_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EmailActionTypes.SEND_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EmailActionTypes.SEND_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default EmailReducer;
