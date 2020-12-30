import React from "react";
import { Link } from "react-router-dom";
import "./CartItemDropDown.scss";
import { connect } from "react-redux";
import { clearItemFromCart } from "../../redux/cart/cart.actions";

const CartItemDropDown = ({ item, clearItemFromCart }) => {
  const { slug, name, discount_price, quantity, images } = item;

  return (
    <li className="dropdown-item-wrapper">
      <div className="media">
        <Link to={`/product/${slug}`}>
          <img src={images[0]} alt={name} />
        </Link>
        <div className="media-body">
          <Link to={`/product/${slug}`}>
            <h4>{name}</h4>
          </Link>
          <h4>
            <span>
              {quantity} x {discount_price}
            </span>
          </h4>
        </div>
      </div>
      <div className="close-circle">
        <i className="fas fa-times" onClick={() => clearItemFromCart(item)}></i>
      </div>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(null, mapDispatchToProps)(CartItemDropDown);
