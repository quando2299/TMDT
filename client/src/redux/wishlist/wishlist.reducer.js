import { WishListActionTypes } from "./wishlist.types";
import { addItemToWishList } from "./wishlist.utils";

const INITIAL_STATE = {
  wishListItems: [],
};

const wishListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WishListActionTypes.ADD_ITEM_WISHLIST:
      return {
        ...state,
        wishListItems: addItemToWishList(state.wishListItems, action.payload),
      };
    case WishListActionTypes.CLEAR_ITEM_FROM_WISHLIST:
      return {
        ...state,
        wishListItems: state.wishListItems.filter(
          (wishListItem) => wishListItem._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export default wishListReducer;
