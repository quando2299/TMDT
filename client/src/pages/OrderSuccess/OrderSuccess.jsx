import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import { checkDate, deliveryDate } from "../../common/constant";
import CustomButton from "../../components/CustomButton/CustomButton";
import "./OrderSuccess.scss";

const OrderSuccess = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Helmet>
        <title>Nike shop | Order success page</title>
        <meta
          name="description"
          content="Multikart – Nike shop eCommerce Template."
        />
      </Helmet>
      {props.location.state ? (
        <>
          <section className="section-order light-layout">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="success-text">
                    <i className="fas fa-check-circle"></i>
                    <h2>Thank you</h2>
                    <p>
                      Payment Is Has Been Received Order Placed Successfully
                    </p>
                    <p>Order ID: {props.location.state.paymentResult.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section-order">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="product-order">
                    <h3>your order details</h3>
                    {props.location.state.cartItems.map((item, index) => {
                      return (
                        <div className="row product-order-detail" key={index}>
                          <div className="col-3">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="img-fluid"
                            />
                          </div>
                          <div className="col-3 order_detail">
                            <div>
                              <h4>product name</h4>
                              <h5>{item.name}</h5>
                            </div>
                          </div>
                          <div className="col-3 order_detail">
                            <div>
                              <h4>quantity</h4>
                              <h5>{item.quantity}</h5>
                            </div>
                          </div>
                          <div className="col-3 order_detail">
                            <div>
                              <h4>price</h4>
                              <h5>${item.discount_price * item.quantity}</h5>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="total-sec">
                      <ul>
                        <li>
                          subtotal{" "}
                          <span>${props.location.state.totalPrice}</span>
                        </li>
                        <li>
                          shipping <span>$0</span>
                        </li>
                        <li>
                          tax(GST) <span>$0</span>
                        </li>
                      </ul>
                    </div>
                    <div className="final-total">
                      <h3>
                        total <span>${props.location.state.totalPrice}</span>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row order-success-sec">
                    <div className="col-sm-6">
                      <h4>summery</h4>
                      <ul className="order-detail">
                        <li>
                          Order ID: {props.location.state.paymentResult.id}
                        </li>
                        <li>
                          Payer ID:{" "}
                          {props.location.state.paymentResult.payer.payer_id}
                        </li>
                        <li>Order Date: {checkDate}</li>
                        <li>Order Total: ${props.location.state.totalPrice}</li>
                      </ul>
                    </div>
                    <div className="col-sm-6">
                      <h4>shipping address</h4>
                      <ul className="order-detail">
                        <li>{props.location.state.address.address}</li>
                        <li>{props.location.state.address.city}</li>
                        <li>
                          {props.location.state.address.state}{" "}
                          {props.location.state.address.postal}
                        </li>
                      </ul>
                    </div>
                    <div className="col-sm-12 payment-mode">
                      <h4>payment method</h4>
                      <p>
                        Pay on Delivery (Cash/Card). Cash on delivery (COD)
                        available. Card/Net banking acceptance subject to device
                        availability.
                      </p>
                    </div>
                    <div className="col-md-12">
                      <div className="delivery-sec">
                        <h3>expected date of delivery</h3>
                        <h2>{deliveryDate}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="p-0">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="error-section">
                  <h1>404</h1>
                  <h2>page not found</h2>
                  <CustomButton onClick={() => props.history.push("/")}>
                    back to home
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default withRouter(OrderSuccess);
