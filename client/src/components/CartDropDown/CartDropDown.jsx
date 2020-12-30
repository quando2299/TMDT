import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectTotalPrice,
} from "../../redux/cart/cart.selectors";
import CartItemDropDown from "../CartItemDropDown/CartItemDropDown";
import "./CartDropDown.scss";

const CartDropDown = ({ cartItems, totalPrice }) => {
  return (
    <ul className="show-div shopping-cart">
      {cartItems.map((item, index) => (
        <CartItemDropDown item={item} key={index} />
      ))}
      {cartItems.length > 0 ? (
        <div>
          <li className="cart-action">
            <div className="total">
              <h5>
                subtotal :<span>${totalPrice}</span>
              </h5>
            </div>
          </li>
          <li className="cart-action">
            <div className="buttons">
              <Link to="/cart" className="view-cart">
                view cart
              </Link>
              <Link to="/checkout" className="checkout">
                checkout
              </Link>
            </div>
          </li>
        </div>
      ) : (
        <li style={{ paddingLeft: "0", textAlign: "center" }}>
          <h5>Your cart is currently empty.</h5>
        </li>
      )}
    </ul>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalPrice: selectTotalPrice,
});

export default connect(mapStateToProps)(CartDropDown);
