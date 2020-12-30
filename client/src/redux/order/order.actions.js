import axiosInstance from "../../helpers/axiosService";
import { OrderActionTypes } from "./order.types";
import { alertSuccess } from "../../common/utils";

export const orderCreateRequest = (order) => {
  return (dispatch) => {
    dispatch({ type: OrderActionTypes.ORDER_CREATE_REQUEST });
    axiosInstance
      .post("/order/create", {
        ...order,
      })
      .then((response) => {
        dispatch({
          type: OrderActionTypes.ORDER_CREATE_SUCCESS,
          payload: response.data.order,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: OrderActionTypes.ORDER_CREATE_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};

export const getOrderRequest = (userId) => {
  return (dispatch) => {
    dispatch({ type: OrderActionTypes.GET_ORDER_REQUEST });
    axiosInstance
      .get(`/orders/${userId}`)
      .then((response) => {
        dispatch({
          type: OrderActionTypes.GET_ORDER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: OrderActionTypes.GET_ORDER_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};

export const getAllOrderRequest = () => {
  return (dispatch) => {
    dispatch({ type: OrderActionTypes.GET_ALL_ORDER_REQUEST });
    axiosInstance
      .get("/orders")
      .then((response) => {
        dispatch({
          type: OrderActionTypes.GET_ALL_ORDER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: OrderActionTypes.GET_ALL_ORDER_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};

export const getStatusOrder = () => {
  return (dispatch) => {
    dispatch({ type: OrderActionTypes.GET_STATUS_ORDER_REQUEST });
    axiosInstance
      .get("/order/status")
      .then((response) => {
        dispatch({
          type: OrderActionTypes.GET_STATUS_ORDER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: OrderActionTypes.GET_STATUS_ORDER_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};

export const updateStatusOrder = (orderId, status) => {
  return (dispatch) => {
    dispatch({ type: OrderActionTypes.UPDATE_STATUS_ORDER_REQUEST });
    axiosInstance
      .put(`/order/status/${orderId}`, status)
      .then((response) => {
        alertSuccess("Updated status successfully!");
        dispatch({
          type: OrderActionTypes.UPDATE_STATUS_ORDER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: OrderActionTypes.UPDATE_STATUS_ORDER_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};
