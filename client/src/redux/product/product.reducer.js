import { ProductActionTypes } from "./product.types";

const INITIAL_STATE = {
  products: [],
  size: 0,
  loading: false,
  error: null,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductActionTypes.FETCH_PRODUCT_SUCCESS:
      const { products, skip } = action.payload;
      return {
        ...state,
        loading: false,
        products:
          skip === 0
            ? products.products
            : [].concat(state.products, products.products),
        size: products.size,
      };
    case ProductActionTypes.FETCH_PRODUCT_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        size: action.payload.result,
      };
    case ProductActionTypes.FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductActionTypes.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductActionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case ProductActionTypes.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductActionTypes.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductActionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter((item) => item._id !== action.payload),
      };
    case ProductActionTypes.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductActionTypes.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductActionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ProductActionTypes.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
