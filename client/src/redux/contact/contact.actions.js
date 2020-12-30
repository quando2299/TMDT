import { alertFailure, alertSuccess } from "../../common/utils";
import axiosInstance from "../../helpers/axiosService";
import { ContactActionTypes } from "./contact.types";

export const sendFeedbackRequest = (feedback) => {
  return (dispatch) => {
    dispatch({ type: ContactActionTypes.FEEDBACK_REQUEST });
    axiosInstance
      .post("/contacts", {
        ...feedback,
      })
      .then((response) => {
        alertSuccess("Thanks for your feedback!");
        dispatch({ type: ContactActionTypes.CREATE_FEEDBACK_SUCCESS });
      })
      .catch((error) => {
        if (error.response) {
          alertFailure(error.response.data.message);
          dispatch({
            type: ContactActionTypes.CREATE_FEEDBACK_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};

export const getFeedbackRequest = () => {
  return (dispatch) => {
    dispatch({ type: ContactActionTypes.GET_FEEDBACK_REQUEST });
    axiosInstance
      .get("/contacts")
      .then((response) => {
        dispatch({
          type: ContactActionTypes.GET_FEEDBACK_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: ContactActionTypes.GET_FEEDBACK_FAILURE,
            payload: error.response.data.message,
          });
        }
      });
  };
};
