import React from "react";
import { Link } from "react-router-dom";
import "./OrderItem.scss";

const OrderItem = ({ order }) => {
  const { _id, paymentResult, totalPrice, createdAt, status } = order;

  return (
    <tr className="order-row">
      <td>
        <p>{paymentResult.id}</p>
      </td>
      <td>
        <p>{new Date(createdAt).toISOString().substring(0, 10)}</p>
      </td>
      <td>
        <h2>${totalPrice}</h2>
        <div className="mobile-cart-content flex row">
          <div className="col-xs-3">
            <p>{status}</p>
          </div>
          <div className="col-xs-3">
            <Link to={`/order-detail/${_id}`}>
              <i className="fas fa-angle-right"></i>
            </Link>
          </div>
        </div>
      </td>
      <td>
        <p>{status}</p>
      </td>
      <td>
        <Link to={`/order-detail/${_id}`} className="detail-link">
          View detail
        </Link>
      </td>
    </tr>
  );
};

export default OrderItem;
