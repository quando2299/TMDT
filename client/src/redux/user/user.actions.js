import { alertFailure, alertSuccess } from "../../common/utils";
import axiosInstance from "../../helpers/axiosService";
import { UserActionTypes } from "./user.types";
import { updateAuth } from "../auth/auth.actions";

export const signupRequest = (user) => {
  return (dispatch) => {
    dispatch({ type: UserActionTypes.SIGNUP_REQUEST });
    axiosInstance
      .post("/signup", {
        ...user,
      })
      .then((response) => {
        alertSuccess(response.data.message);
        dispatch({ type: UserActionTypes.SIGNUP_SUCCESS });
      })
      .catch((error) => {
        if (error.response) {
          alertFailure(error.response.data.message);
          dispatch({
            type: UserActionTypes.SIGNUP_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};

export const editRequest = (userId, userInfo) => {
  return (dispatch) => {
    dispatch({ type: UserActionTypes.EDIT_REQUEST });
    axiosInstance
      .put(`/user/${userId}`, userInfo)
      .then((response) => {
        alertSuccess("Edit profile successfully!");
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({
          type: UserActionTypes.EDIT_SUCCESS,
        });
        dispatch(updateAuth(response.data));
      })
      .catch((error) => {
        if (error.response) {
          alertFailure(error.response.data.message);
          dispatch({
            type: UserActionTypes.EDIT_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};

export const changePasswordRequest = (userId, userInfo) => {
  return (dispatch) => {
    dispatch({ type: UserActionTypes.EDIT_REQUEST });
    axiosInstance
      .put(`/user/password/${userId}`, userInfo)
      .then((response) => {
        alertSuccess("change password successfully!");
        dispatch({
          type: UserActionTypes.EDIT_SUCCESS,
        });
      })
      .catch((error) => {
        if (error.response) {
          alertFailure(error.response.data.message);
          dispatch({
            type: UserActionTypes.EDIT_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};

export const getAllUserRequest = () => {
  return (dispatch) => {
    dispatch({ type: UserActionTypes.GET_ALL_USER_REQUEST });
    axiosInstance
      .get("/users")
      .then((response) => {
        dispatch({
          type: UserActionTypes.GET_ALL_USER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: UserActionTypes.EDIT_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};

export const UpdateUserRoleRequest = (userId, role) => {
  return (dispatch) => {
    dispatch({ type: UserActionTypes.UPDATE_USER_REQUEST });
    axiosInstance
      .put(`/user/update/${userId}`, role)
      .then((response) => {
        dispatch({
          type: UserActionTypes.UPDATE_USER_SUCCESS,
          payload: {
            data: response.data,
            userId,
          },
        });
        alertSuccess("Update user successfully!");
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: UserActionTypes.UPDATE_USER_FAILURE,
            payload: error.response.data.message,
          });
          alertFailure(error.response.data.message);
        }
      });
  };
};

export const deleteUserRequest = (userId) => {
  return (dispatch) => {
    dispatch({ type: UserActionTypes.DELETE_USER_REQUEST });
    axiosInstance
      .delete(`/user/${userId}`)
      .then((response) => {
        dispatch({
          type: UserActionTypes.DELETE_USER_SUCCESS,
          payload: userId,
        });
        alertSuccess(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: UserActionTypes.DELETE_USER_FAILURE,
            payload: error.response.data.message,
          });
          alertFailure(error.response.data.message);
        }
      });
  };
};
