import { WishListActionTypes } from "./wishlist.types";

export const addItemWishList = (item) => ({
  type: WishListActionTypes.ADD_ITEM_WISHLIST,
  payload: item,
});

export const clearItemFromWishList = (item) => ({
  type: WishListActionTypes.CLEAR_ITEM_FROM_WISHLIST,
  payload: item,
});
