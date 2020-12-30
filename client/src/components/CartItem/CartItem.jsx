import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearItemFromCart } from "../../redux/cart/cart.actions";
import QuantityInput from "../QuantityInput/QuantityInput";
import "./CartItem.scss";

const CartItem = ({ product, clearItemFromCart }) => {
  const { slug, name, discount_price, quantity, images } = product;
  return (
    <tr className="product-row">
      <td>
        <Link to={`/product/${slug}`} className="product-image">
          <img src={`${images[0]}`} alt={name} />
        </Link>
      </td>
      <td>
        <Link to={`/product/${slug}`}>{name}</Link>
        <div className="mobile-cart-content flex row">
          <div className="col-xs-3">
            <div className="qty-box">
              <div className="input-group">
                <input
                  type="text"
                  name="quantity"
                  className="form-control input-number"
                  value={quantity}
                />
              </div>
            </div>
          </div>
          <div className="col-xs-3">
            <h2 className="td-color">${discount_price}</h2>
          </div>
          <div className="col-xs-3">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => clearItemFromCart(product)}
            >
              <i className="fa fa-times"></i>
            </div>
          </div>
        </div>
      </td>
      <td>
        <h2>${discount_price}</h2>
      </td>
      <td>
        <div className="qty-box">
          <QuantityInput product={product} quantity={quantity} detail={false} />
        </div>
      </td>
      <td>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => clearItemFromCart(product)}
        >
          <i className="fa fa-times"></i>
        </div>
      </td>
      <td>
        <h2 className="td-color">${discount_price * quantity}</h2>
      </td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(null, mapDispatchToProps)(CartItem);
