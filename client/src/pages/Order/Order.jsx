import React, { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/images/icon-empty-cart.png";
import BreadScrumb from "../../components/Breadcrumb/Breadcrumbs";
import Loading from "../../components/Loading/Loading";
import OrderItem from "../../components/OrderItem/OrderItem";
import { getOrderRequest } from "../../redux/order/order.actions";
import "./Order.scss";

const Order = ({ history }) => {
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.auth);
  const { user } = authSelector;
  const orderSelector = useSelector((state) => state.order);
  const { order, loading } = orderSelector;

  const getOrders = useCallback(() => {
    dispatch(getOrderRequest(user._id));
  }, [dispatch, user]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getOrders();
  }, [getOrders]);

  return (
    <>
      <Helmet>
        <title>Nike shop | Order page</title>
        <meta
          name="description"
          content="Multikart – Nike shop eCommerce Template."
        />
      </Helmet>
      {loading ? (
        <div
          className="flex jf-center mtb100 p-detail-wrapper"
          style={{ width: "100%" }}
        >
          <Loading />
        </div>
      ) : (
        <>
          <BreadScrumb path={history.location} />
          {order && order.length > 0 ? (
            <section className="order-section section-b-space">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <table className="table cart-table table-responsive-xs">
                      <thead>
                        <tr className="table-head">
                          <th scope="col">ID</th>
                          <th scope="col">date</th>
                          <th scope="col">total</th>
                          <th scope="col">status</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {order &&
                          order.map((item, index) => (
                            <OrderItem key={index} order={item} />
                          ))}
                      </tbody>
                    </table>
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
                          <strong>Your Order is Empty</strong>
                        </h3>
                        <h4>Let's buy something in our shop.</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Order;
