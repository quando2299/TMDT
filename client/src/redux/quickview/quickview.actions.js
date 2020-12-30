import { QuickViewActionTypes } from "./quickview.types";

export const openModal = (product) => ({
  type: QuickViewActionTypes.OPEN_MODAL,
  payload: product,
});

export const closeModal = () => ({
  type: QuickViewActionTypes.CLOSE_MODAL,
});
