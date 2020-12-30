import {
  alertFailure,
  alertSuccess,
  customAlertSuccess,
} from "../../common/utils";
import axiosInstance from "../../helpers/axiosService";
import { ProductActionTypes } from "./product.types";

export const allProductRequest = (filter, skip) => {
  return (dispatch) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCT_REQUEST });
    axiosInstance
      .post(`/products/filter`, filter)
      .then((response) => {
        dispatch({
          type: ProductActionTypes.FETCH_PRODUCT_SUCCESS,
          payload: {
            products: response.data,
            skip: skip,
          },
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: ProductActionTypes.FETCH_PRODUCT_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};

export const allProductSearchRequest = (keyword) => {
  return (dispatch) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCT_REQUEST });
    axiosInstance
      .get(`/products/all?keyword=${keyword}`)
      .then((response) => {
        dispatch({
          type: ProductActionTypes.FETCH_PRODUCT_SEARCH_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: ProductActionTypes.FETCH_PRODUCT_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};

export const createProductRequest = (product) => {
  return (dispatch) => {
    dispatch({ type: ProductActionTypes.CREATE_PRODUCT_REQUEST });
    axiosInstance
      .post("/product/create", product)
      .then((response) => {
        dispatch({
          type: ProductActionTypes.CREATE_PRODUCT_SUCCESS,
          payload: response.data.product,
        });
        customAlertSuccess(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: ProductActionTypes.CREATE_PRODUCT_FAILURE,
            payload: error.response.data.message,
          });
          alertFailure(error.response.data.message);
        }
      });
  };
};

export const updateProductRequest = (product, productId) => {
  return (dispatch) => {
    dispatch({ type: ProductActionTypes.UPDATE_PRODUCT_REQUEST });
    axiosInstance
      .put(`/product/${productId}`, product)
      .then((response) => {
        dispatch({
          type: ProductActionTypes.UPDATE_PRODUCT_SUCCESS,
        });
        customAlertSuccess(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: ProductActionTypes.UPDATE_PRODUCT_FAILURE,
            payload: error.response.data.message,
          });
          alertFailure(error.response.data.message);
        }
      });
  };
};

export const deleteProductRequest = (productId) => {
  return (dispatch) => {
    dispatch({ type: ProductActionTypes.DELETE_PRODUCT_REQUEST });
    axiosInstance
      .delete(`/product/${productId}`)
      .then((response) => {
        dispatch({
          type: ProductActionTypes.DELETE_PRODUCT_SUCCESS,
          payload: productId,
        });
        alertSuccess(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: ProductActionTypes.DELETE_PRODUCT_FAILURE,
            payload: error.response.data.message,
          });
          alertFailure(error.response.data.message);
        }
      });
  };
};
