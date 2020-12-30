import { alertFailure } from "../../common/utils";
import axiosInstance from "../../helpers/axiosService";
import { AuthActionTypes } from "./auth.types";

export const loginRequest = (user) => {
  return (dispatch) => {
    dispatch({ type: AuthActionTypes.LOGIN_REQUEST });
    axiosInstance
      .post("/signin", {
        ...user,
      })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: AuthActionTypes.LOGIN_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        if (error.response) {
          alertFailure(error.response.data.message);
          dispatch({
            type: AuthActionTypes.LOGIN_FAILURE,
          });
        }
      });
  };
};

export const loginAdminRequest = (user) => {
  return (dispatch) => {
    dispatch({ type: AuthActionTypes.LOGIN_REQUEST });
    axiosInstance
      .post("/admin/signin", {
        ...user,
      })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: AuthActionTypes.LOGIN_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        if (error.response) {
          alertFailure(error.response.data.message);
          dispatch({
            type: AuthActionTypes.LOGIN_FAILURE,
          });
        }
      });
  };
};

export const isUserLoggedIn = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = localStorage.getItem("user");

      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: JSON.parse(user),
      });
    } else {
      dispatch({
        type: AuthActionTypes.LOGIN_FAILURE,
      });
    }
  };
};

export const signoutRequest = () => {
  return (dispatch) => {
    dispatch({ type: AuthActionTypes.LOGOUT_REQUEST });
    axiosInstance
      .post("/signout")
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: AuthActionTypes.LOGOUT_SUCCESS });
      })
      .catch((error) => {
        dispatch({
          type: AuthActionTypes.LOGOUT_FAILURE,
        });
      });
  };
};

export const updateAuth = (userInfo) => ({
  type: AuthActionTypes.UPDATE_AUTH,
  payload: userInfo,
});
