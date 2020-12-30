export const addItemToWishList = (wishListItems, wishListItemToAdd) => {
  const existingWishListItem = wishListItems.find(
    (wishListItem) => wishListItem._id === wishListItemToAdd._id
  );

  if (existingWishListItem) {
    return [...wishListItems];
  }

  return [...wishListItems, wishListItemToAdd];
};
