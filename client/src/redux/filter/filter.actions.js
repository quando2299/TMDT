import { FilterActionTypes } from "./filter.types";

export const toggleCategoryFilter = (filterArr) => ({
  type: FilterActionTypes.FILTER_CATEGORY,
  payload: filterArr,
});

export const setPriceRangeFilter = (filterArr) => ({
  type: FilterActionTypes.FILTER_PRICE,
  payload: filterArr,
});

export const setOrderFilter = (order) => ({
  type: FilterActionTypes.FILTER_ORDER,
  payload: order,
});

export const setSkip = (skip) => ({
  type: FilterActionTypes.SET_SKIP,
  payload: skip,
});
