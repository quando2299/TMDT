import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { PayPalButton } from "react-paypal-button-v2";
import { connect, useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { alertFailure } from "../../common/utils";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumbs";
import { clearAllItems } from "../../redux/cart/cart.actions";
import {
  selectCartItems,
  selectTotalPrice
} from "../../redux/cart/cart.selectors";
import { orderCreateRequest } from "../../redux/order/order.actions";
import "./Checkout.scss";

const Checkout = ({ cartItems, history, totalPrice }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const authSelector = useSelector((state) => state.auth);
  const { isAuthenticate } = authSelector;

  const [data, setData] = useState({
    address: "",
    city: "",
    postal: "",
    state: "",
  });
  const [validation, setValidation] = useState({
    address: "",
    city: "",
    postal: "",
    state: "",
  });
  const dispatch = useDispatch();

  const validPostalRegex = RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );

    const { address, city, postal, state } = data;

    if (address === "" || city === "" || postal === "" || state === "") {
      return false;
    }

    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    switch (name) {
      case "address":
        validation.address =
          value.length < 2 ? "Address must be 2 characters long!" : "";
        break;
      case "city":
        validation.city =
          value.length < 2 ? "City must be 2 characters long!" : "";
        break;
      case "state":
        validation.state =
          value.length < 2 ? "State must be 2 characters long!" : "";
        break;
      case "postal":
        validation.postal = validPostalRegex.test(value)
          ? ""
          : "Postal is not valid!";
        break;
      default:
        break;
    }

    setValidation({ ...validation });
  };

  const transactionSuccess = (paymentResult) => {
    const shippingAddress = { ...data };
    const orderItems = cartItems;
    dispatch(
      orderCreateRequest({
        orderItems,
        shippingAddress,
        paymentResult,
        totalPrice,
      })
    );
    dispatch(clearAllItems());
    history.push({
      pathname: "/order-success",
      state: {
        paymentResult,
        address: shippingAddress,
        cartItems,
        totalPrice,
      },
    });
  };

  const transactionError = () => {
    alertFailure("Pay error!");
  };

  const transactionCanceled = () => {
    alertFailure("Checkout has been cancelled!");
  };

  const showDropIn = () => {
    return (
      <React.Fragment>
        {cartItems.length > 0 && validateForm(validation) ? (
          <PayPalButton
            amount={totalPrice}
            onSuccess={transactionSuccess}
            onError={transactionError}
            onCancel={transactionCanceled}
            options={{
              clientId:
                process.env.REACT_APP_PAYPAL_ID ||
                "AXrLZUi0q1CgqFzCuzDETzuMvR-Iun-_AFKnl40qFn3ow6bPUduwysgBMqxPw09J2jDuIP5FmAEmn180",
            }}
          />
        ) : null}
      </React.Fragment>
    );
  };

  const showCheckout = () => {
    return isAuthenticate ? (
      showDropIn()
    ) : (
      <h2 className="checkout-heading">Please signin to checkout!</h2>
    );
  };

  return (
    <>
      <Helmet>
        <title>Nike shop | Checkout</title>
        <meta
          name="description"
          content="Multikart – Nike shop eCommerce Template."
        />
      </Helmet>
      <Breadcrumbs path={history.location} />
      <section className="section-b-space section-checkout-wrapper">
        <div className="container padding-cls">
          <div className="row">
            <div className="col-lg-6 col-sm-12 col-xs-12">
              <form className="checkout-form">
                <div className="checkout-title">
                  <h3>Billing Details</h3>
                </div>
                <div className="row check-out">
                  <div className="form-group col-md-12 col-sm-12 col-xs-12">
                    <label className="field-label" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={data.address}
                      onChange={handleChange}
                      placeholder="Street address"
                    />
                    {validation.address.length > 0 && (
                      <div className="error">{validation.address}</div>
                    )}
                  </div>
                  <div className="form-group col-md-12 col-sm-12 col-xs-12">
                    <label className="field-label" htmlFor="city">
                      Town / City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={data.city}
                      onChange={handleChange}
                    />
                    {validation.city.length > 0 && (
                      <div className="error">{validation.city}</div>
                    )}
                  </div>
                  <div className="form-group col-md-12 col-sm-12 col-xs-12">
                    <label className="field-label" htmlFor="state">
                      State / Country
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={data.state}
                      onChange={handleChange}
                    />
                    {validation.state.length > 0 && (
                      <div className="error">{validation.state}</div>
                    )}
                  </div>
                  <div className="form-group col-md-12 col-sm-12 col-xs-12">
                    <label className="field-label" htmlFor="postal">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postal"
                      id="postal"
                      value={data.postal}
                      onChange={handleChange}
                    />
                    {validation.postal.length > 0 && (
                      <div className="error">{validation.postal}</div>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-6 col-sm-12 col-xs-12">
              <div className="checkout-details">
                <div className="order-box">
                  <div className="title-box">
                    <div>
                      Product <span> Total</span>
                    </div>
                  </div>
                  <ul className="qty">
                    {cartItems.map((item, index) => (
                      <li key={index}>
                        {item.name} × {item.quantity}
                        <span>${item.discount_price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="sub-total">
                    <li>
                      Subtotal <span className="count">${totalPrice}</span>
                    </li>
                  </ul>
                  <ul className="total">
                    <li>
                      Total <span className="count">${totalPrice}</span>
                    </li>
                  </ul>
                </div>
                <div className="payment-box">
                  <div className="upper-box">
                    <div className="payment-options">
                      <ul>
                        <li>
                          <div className="radio-option paypal">
                            <input
                              defaultChecked
                              type="radio"
                              name="payment-group"
                              id="payment-1"
                            />
                            <label htmlFor="payment-1">
                              PayPal
                              <span className="image">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/images/paypal-checkout.png`}
                                  alt="paypal"
                                />
                              </span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-right">{showCheckout()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalPrice: selectTotalPrice,
});

export default withRouter(connect(mapStateToProps)(Checkout));
