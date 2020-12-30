import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { alertSuccess } from "../../common/utils";
import { addItem } from "../../redux/cart/cart.actions";
import { clearItemFromWishList } from "../../redux/wishlist/wishlist.actions";
import "./WishListItem.scss";

const WishListItem = ({ addItem, clearItemFromWishList, product }) => {
  const addToCart = (product) => {
    addItem(product, 1);
    clearItemFromWishList(product);
    alertSuccess(`Add to cart ${product.name} successfully!`);
  };

  const { slug, name, discount_price, price, sale, images } = product;
  return (
    <tr className="wishlist-row">
      <td>
        <Link to={`/product/${slug}`} className="product-image">
          <img src={`${images[0]}`} alt={name} />
        </Link>
      </td>
      <td>
        <Link to={`/product/${slug}`}>{name}</Link>
        <div className="mobile-cart-content flex row">
          <div className="col-xs-3">
            <p>in stock</p>
          </div>
          <div className="col-xs-3">
            <h2 className="td-color">
              ${discount_price}
            </h2>
            {sale > 0 ? (
              <del>
                <span className="money">${price}</span>
              </del>
            ) : null}
          </div>
          <div className="col-xs-3">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => clearItemFromWishList(product)}
            >
              <i className="fa fa-times"></i>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => addToCart(product)}
            >
              <i className="fas fa-cart-arrow-down"></i>
            </div>
          </div>
        </div>
      </td>
      <td>
        <h2>${discount_price}</h2>
        {sale > 0 ? (
          <del>
            <span className="money">${price}</span>
          </del>
        ) : null}
      </td>
      <td>
        <p>in stock</p>
      </td>
      <td>
        <div
          style={{ cursor: "pointer", display: "inline-block" }}
          onClick={() => clearItemFromWishList(product)}
        >
          <i className="fa fa-times"></i>
        </div>
        <div
          style={{ cursor: "pointer", display: "inline-block" }}
          onClick={() => addToCart(product)}
        >
          <i className="fas fa-cart-arrow-down"></i>
        </div>
      </td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item, quantity) => dispatch(addItem(item, quantity)),
  clearItemFromWishList: (item) => dispatch(clearItemFromWishList(item)),
});

export default connect(null, mapDispatchToProps)(WishListItem);
