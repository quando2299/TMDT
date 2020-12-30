import { alertFailure, alertSuccess } from "../../common/utils";
import axiosInstance from "../../helpers/axiosService";
import { EmailActionTypes } from "./email.types";

export const sendEmailRequest = (email) => {
  return (dispatch) => {
    dispatch({ type: EmailActionTypes.SEND_EMAIL_REQUEST });
    axiosInstance
      .post("/email", email)
      .then((response) => {
        dispatch({
          type: EmailActionTypes.SEND_EMAIL_SUCCESS,
        });
        alertSuccess(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: EmailActionTypes.SEND_EMAIL_FAILURE,
            payload: error.response.data.message,
          });
          alertFailure(error.response.data.message);
        }
      });
  };
};
