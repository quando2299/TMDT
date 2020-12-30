import { CategoryActionTypes } from "./category.types";

const INITIAL_STATE = {
  categories: [],
  loading: false,
  error: null,
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoryActionTypes.FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CategoryActionTypes.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: null,
      };
    case CategoryActionTypes.FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CategoryActionTypes.TOGGLE_CATEGORY_FILTER:
      return {
        ...state,
        filter: action.payload,
        error: null,
      };
    case CategoryActionTypes.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CategoryActionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
        error: null,
      };
    case CategoryActionTypes.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CategoryActionTypes.REMOVE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CategoryActionTypes.REMOVE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter(
          (item) => item._id !== action.payload
        ),
        error: null,
      };
    case CategoryActionTypes.REMOVE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CategoryActionTypes.UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CategoryActionTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.map((item) => {
          if (item._id === action.payload.categoryId) {
            return {
              ...item,
              name: action.payload.data.name,
              updatedAt: action.payload.data.updatedAt,
            };
          }
          return item;
        }),
        error: null,
      };
    case CategoryActionTypes.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
