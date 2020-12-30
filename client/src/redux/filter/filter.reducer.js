import { FilterActionTypes } from "./filter.types";

const INITIAL_STATE = {
  filter: {
    category: [],
    discount_price: [0, 500],
  },
  limit: 8,
  skip: 0,
  order: "asc",
  sortBy: "_id",
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterActionTypes.FILTER_CATEGORY:
      return {
        ...state,
        filter: {
          ...state.filter,
          category: action.payload || [],
        },
      };
    case FilterActionTypes.FILTER_PRICE:
      return {
        ...state,
        filter: {
          ...state.filter,
          discount_price: action.payload || [],
        },
      };
    case FilterActionTypes.FILTER_ORDER:
      return {
        ...state,
        order: action.payload.order,
        sortBy: action.payload.sortBy,
      };
    case FilterActionTypes.SET_SKIP:
      return {
        ...state,
        skip: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
