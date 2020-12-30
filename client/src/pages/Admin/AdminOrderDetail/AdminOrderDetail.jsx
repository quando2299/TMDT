import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import icon from "../../../assets/images/dropdown.png";
import { checkDate } from "../../../common/constant";
import AdminBreadcrumb from "../../../components/Admin/AdminBreadcrumb/AdminBreadcrumb";
import axiosService from "../../../helpers/axiosService";
import {
  getStatusOrder,
  updateStatusOrder,
} from "../../../redux/order/order.actions";
import "./AdminOrderDetail.scss";

const AdminOrderDetail = (props) => {
  const [order, setOrder] = useState({});
  const [defaultStatus, setDefaultStatus] = useState("");
  const dispatch = useDispatch();

  const orderSelector = useSelector((state) => state.order);
  const { status } = orderSelector;

  const loadOrder = useCallback((orderId) => {
    axiosService
      .get(`/order/${orderId}`)
      .then((response) => {
        setOrder(response.data);
        setDefaultStatus(response.data.status);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.message);
        }
      });
  }, []);

  const loadStatus = useCallback(() => {
    dispatch(getStatusOrder());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const orderId = props.match.params.orderId;
    loadOrder(orderId);
    loadStatus();
  }, [props, loadOrder, loadStatus]);

  const handleChangeStatus = (e) => {
    dispatch(
      updateStatusOrder(props.match.params.orderId, { status: e.target.value })
    );
    setDefaultStatus(e.target.value);
  };

  return (
    <>
      <AdminBreadcrumb title="Order Detail" parent="Order" />
      <div className="container-fluid admin-detail">
        <div className="card">
          <div className="card-header">
            <h5>Order Detail</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="product-order">
                  <h3>your order details</h3>
                  {order.orderItems?.map((item, index) => (
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
                  ))}
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
                    <h4>Summary</h4>
                    <ul className="order-detail">
                      <li>Order ID: {order.paymentResult?.id}</li>
                      <li>Payer ID: {order.paymentResult?.payer.payer_id}</li>
                      <li>Order Date: {checkDate}</li>
                      <li>Order Total: ${order.totalPrice}</li>
                    </ul>
                    <div className="select-status">
                      <h4>Status</h4>
                      <select
                        onChange={handleChangeStatus}
                        value={defaultStatus}
                        style={{
                          background: "url(" + icon + ") no-repeat 95%",
                        }}
                        name="status"
                        id="status"
                        className="form-control"
                      >
                        {status &&
                          status.map((s, index) => (
                            <option key={index} value={s}>
                              {s}
                            </option>
                          ))}
                      </select>
                    </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrderDetail;
