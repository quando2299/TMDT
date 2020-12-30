import { OrderActionTypes } from "./order.types";

const INITIAL_STATE = {
  order: null,
  status: null,
  loading: false,
  error: null,
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case OrderActionTypes.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };
    case OrderActionTypes.ORDER_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        order: null,
        error: action.payload,
      };
    case OrderActionTypes.GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case OrderActionTypes.GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };
    case OrderActionTypes.GET_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        order: null,
        error: action.payload,
      };
    case OrderActionTypes.GET_ALL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case OrderActionTypes.GET_ALL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };
    case OrderActionTypes.GET_ALL_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        order: null,
        error: action.payload,
      };
    case OrderActionTypes.GET_STATUS_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case OrderActionTypes.GET_STATUS_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload,
        error: null,
      };
    case OrderActionTypes.GET_STATUS_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OrderActionTypes.UPDATE_STATUS_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case OrderActionTypes.UPDATE_STATUS_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: state.order.map((item) => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              status: action.payload.status,
              updatedAt: action.payload.updatedAt,
            };
          }
          return item;
        }),
        error: null,
      };
    case OrderActionTypes.UPDATE_STATUS_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
