import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { checkDate } from "../../common/constant";
import axiosService from "../../helpers/axiosService";
import "./OrderDetail.scss";

const OrderDetail = (props) => {
  const [order, setOrder] = useState({});

  const loadOrder = useCallback((orderId) => {
    axiosService
      .get(`/order/${orderId}`)
      .then((response) => setOrder(response.data))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.message);
        }
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const orderId = props.match.params.orderId;
    loadOrder(orderId);
  }, [props, loadOrder]);

  return (
    <>
      <Helmet>
        <title>Nike shop | Order detail page</title>
        <meta
          name="description"
          content="Multikart – Nike shop eCommerce Template."
        />
      </Helmet>
      <section className="section-order-detail light-layout">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="success-text">
                <i className="fas fa-receipt"></i>
                <p>Order ID: {order.paymentResult?.id}</p>
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
                {order.orderItems?.map((item, index) => {
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
                      subtotal <span>${order.totalPrice}</span>
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
                    total <span>${order.totalPrice}</span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row order-success-sec">
                <div className="col-sm-6">
                  <h4>summery</h4>
                  <ul className="order-detail">
                    <li>Order ID: {order.paymentResult?.id}</li>
                    <li>Payer ID: {order.paymentResult?.payer.payer_id}</li>
                    <li>Order Date: {checkDate}</li>
                    <li>Order Total: ${order.totalPrice}</li>
                    <li>Order Status: {order.status}</li>
                  </ul>
                </div>
                <div className="col-sm-6">
                  <h4>shipping address</h4>
                  <ul className="order-detail">
                    <li>{order.shippingAddress?.address}</li>
                    <li>{order.shippingAddress?.city}</li>
                    <li>
                      {order.shippingAddress?.state}{" "}
                      {order.shippingAddress?.postal}
                    </li>
                  </ul>
                </div>
                {/* <div className="col-sm-12 payment-mode">
                  <h4>status</h4>
                  <p>order.status</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetail;
