import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/auth.reducer";
import cartReducer from "./cart/cart.reducer";
import categoryReducer from "./category/category.reducer";
import contactReducer from "./contact/contact.reducer";
import EmailReducer from "./email/email.reducer";
import filterReducer from "./filter/filter.reducer";
import orderReducer from "./order/order.reducer";
import productReducer from "./product/product.reducer";
import quickViewReducer from "./quickview/quickview.reducer";
import userReducer from "./user/user.reducer";
import wishListReducer from "./wishlist/wishlist.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "wishList"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  category: categoryReducer,
  contact: contactReducer,
  email: EmailReducer,
  filter: filterReducer,
  order: orderReducer,
  product: productReducer,
  quickView: quickViewReducer,
  user: userReducer,
  wishList: wishListReducer,
});

export default persistReducer(persistConfig, rootReducer);
