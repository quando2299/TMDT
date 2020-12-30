import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { alertSuccess } from "../../common/utils";
import { addItem } from "../../redux/cart/cart.actions";
import { addItemWishList } from "../../redux/wishlist/wishlist.actions";
import { openModal } from "../../redux/quickview/quickview.actions";
import "./ProductItem.scss";

const ProductItem = ({
  addItem,
  addItemWishList,
  product,
  openModal,
  isList,
}) => {
  const addToCart = (product) => {
    addItem(product, 1);
    alertSuccess(`Add to cart ${product.name} successfully!`);
  };

  const addToWishList = (product) => {
    addItemWishList(product);
    alertSuccess(`Add to wishlist ${product.name} successfully!`);
  };

  const { slug, name, discount_price, price, sale, images } = product;

  return (
    <>
      {isList ? (
        <div className="product-box-list">
          <div className="img-wrapper">
            <div className="front">
              <Link to={`/product/${slug}`}>
                <img src={images[0]} className="img-fluid" alt={name} />
              </Link>
            </div>
            <div className="cart-info cart-wrap flex">
              <button title="Add to cart" onClick={() => addToCart(product)}>
                <i className="fas fa-cart-plus"></i>
              </button>
              <button
                title="Add to Wishlist"
                onClick={() => addToWishList(product)}
              >
                <i className="fas fa-heart"></i>
              </button>
              <button title="Quick View" onClick={() => openModal(product)}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="product-detail">
            <Link to={`/product/${slug}`}>
              <h6>{name}</h6>
            </Link>
            <h4 className="product-price">
              ${discount_price}
              {sale > 0 ? (
                <del style={{ marginLeft: "10px" }}>
                  <span>${price}</span>
                </del>
              ) : null}
            </h4>
          </div>
        </div>
      ) : (
        <div className="product-box">
          <div className="img-wrapper">
            <div className="label-block">
              {sale > 0 ? <span className="sale-label">on sale</span> : null}
            </div>
            <div className="front">
              <Link to={`/product/${slug}`}>
                <img src={images[0]} className="img-fluid" alt={name} />
              </Link>
            </div>
            <div className="cart-info cart-wrap flex">
              <button title="Add to cart" onClick={() => addToCart(product)}>
                <i className="fas fa-cart-plus"></i>
              </button>
              <button
                title="Add to Wishlist"
                onClick={() => addToWishList(product)}
              >
                <i className="fas fa-heart"></i>
              </button>
              <button title="Quick View" onClick={() => openModal(product)}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="product-detail">
            <Link to={`/product/${slug}`}>
              <h6>{name}</h6>
            </Link>
            <h4 className="product-price">
              ${discount_price}
              {sale > 0 ? (
                <del style={{ marginLeft: "10px" }}>
                  <span>${price}</span>
                </del>
              ) : null}
            </h4>
          </div>
        </div>
      )}
    </>
  );
};

ProductItem.defaultProps = {
  isList: false,
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item, quantity) => dispatch(addItem(item, quantity)),
  addItemWishList: (item) => dispatch(addItemWishList(item)),
  openModal: (product) => dispatch(openModal(product)),
});

export default connect(null, mapDispatchToProps)(ProductItem);
