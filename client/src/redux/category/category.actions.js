import { alertFailure, alertSuccess } from "../../common/utils";
import axiosInstance from "../../helpers/axiosService";
import { CategoryActionTypes } from "./category.types";

export const categoryRequest = () => {
  return (dispatch) => {
    dispatch({ type: CategoryActionTypes.FETCH_CATEGORY_REQUEST });
    axiosInstance
      .get("/categories")
      .then((response) => {
        dispatch({
          type: CategoryActionTypes.FETCH_CATEGORY_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: CategoryActionTypes.FETCH_CATEGORY_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};

export const createCategoryRequest = (category) => {
  return (dispatch) => {
    dispatch({ type: CategoryActionTypes.ADD_CATEGORY_REQUEST });
    axiosInstance
      .post("/categories", category)
      .then((response) => {
        dispatch({
          type: CategoryActionTypes.ADD_CATEGORY_SUCCESS,
          payload: response.data,
        });
        alertSuccess(`Created ${response.data.name} successfully!`);
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: CategoryActionTypes.ADD_CATEGORY_FAILURE,
            payload: error.response.data.message,
          });
          alertFailure(error.response.data.message);
        }
      });
  };
};

export const deleteCategoryRequest = (categoryId) => {
  return (dispatch) => {
    dispatch({ type: CategoryActionTypes.REMOVE_CATEGORY_REQUEST });
    axiosInstance
      .delete(`/category/${categoryId}`)
      .then((response) => {
        dispatch({
          type: CategoryActionTypes.REMOVE_CATEGORY_SUCCESS,
          payload: categoryId,
        });
        alertSuccess(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: CategoryActionTypes.ADD_CATEGORY_FAILURE,
            payload: error.response.data.message,
          });
          alertFailure(error.response.data.message);
        }
      });
  };
};

export const updateCategoryRequest = (category, categoryId) => {
  return (dispatch) => {
    dispatch({ type: CategoryActionTypes.UPDATE_CATEGORY_REQUEST });
    axiosInstance
      .put(`/category/${categoryId}`, category)
      .then((response) => {
        dispatch({
          type: CategoryActionTypes.UPDATE_CATEGORY_SUCCESS,
          payload: {
            categoryId,
            data: response.data,
          },
        });
        alertSuccess(`Updated ${response.data.name} successfully!`);
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: CategoryActionTypes.UPDATE_CATEGORY_FAILURE,
            payload: error.response.data.message,
          });
          alertFailure(error.response.data.message);
        }
      });
  };
};
