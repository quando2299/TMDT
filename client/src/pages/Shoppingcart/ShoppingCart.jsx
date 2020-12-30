import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import img from "../../assets/images/icon-empty-cart.png";
import BreadScrumb from "../../components/Breadcrumb/Breadcrumbs";
import CartItem from "../../components/CartItem/CartItem";
import CustomButton from "../../components/CustomButton/CustomButton";
import { clearAllItems } from "../../redux/cart/cart.actions";
import {
  selectCartItems,
  selectTotalPrice
} from "../../redux/cart/cart.selectors";
import "./ShoppingCart.scss";

const ShoppingCart = ({ cartItems, totalPrice, history }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Helmet>
        <title>Nike shop | Shopping cart page</title>
        <meta
          name="description"
          content="Multikart – Nike shop eCommerce Template."
        />
      </Helmet>
      <BreadScrumb path={history.location} />
      {cartItems.length > 0 ? (
        <section className="cart-section section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <table className="table cart-table table-responsive-xs">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">image</th>
                      <th scope="col">product name</th>
                      <th scope="col">price</th>
                      <th scope="col">quantity</th>
                      <th scope="col">action</th>
                      <th scope="col">total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <CartItem key={index} product={item} />
                    ))}
                  </tbody>
                </table>
                <table className="table cart-table table-responsive-md">
                  <tfoot>
                    <tr>
                      <td>total price :</td>
                      <td>
                        <h2>${totalPrice}</h2>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="row cart-buttons">
              <div className="col-7">
                <CustomButton onClick={() => history.push("/shop")}>
                  continue shopping
                </CustomButton>
              </div>
              <div className="col-5">
                <CustomButton onClick={() => history.push("/checkout")}>
                  checkout
                </CustomButton>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="cart-section section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div>
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <img
                      src={img}
                      className="img-fluid mb-4"
                      alt="empty-icon"
                    />
                    <h3>
                      <strong>Your Cart is Empty</strong>
                    </h3>
                    <h4>Explore more shortlist some items.</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalPrice: selectTotalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  clearAllItems: () => dispatch(clearAllItems()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
);
