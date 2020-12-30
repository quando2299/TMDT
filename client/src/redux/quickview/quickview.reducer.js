import { QuickViewActionTypes } from "./quickview.types";

const INITIAL_STATE = {
  open: false,
  product: null,
};

const quickViewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QuickViewActionTypes.OPEN_MODAL:
      return {
        ...state,
        open: true,
        product: action.payload,
      };
    case QuickViewActionTypes.CLOSE_MODAL:
      return {
        ...state,
        open: false,
        product: null,
      };
    default:
      return state;
  }
};

export default quickViewReducer;
