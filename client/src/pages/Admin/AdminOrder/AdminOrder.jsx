import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ORDER_COLUMNS, ORDER_STATUSES } from "../../../common/constant";
import AdminBreadcrumb from "../../../components/Admin/AdminBreadcrumb/AdminBreadcrumb";
import AdminTable from "../../../components/Admin/AdminTable/AdminTable";
import { getAllOrderRequest } from "../../../redux/order/order.actions";

const AdminOrder = () => {
  const dispatch = useDispatch();
  const orderSelector = useSelector((state) => state.order);
  const { order } = orderSelector;

  const getOrders = useCallback(() => {
    dispatch(getAllOrderRequest());
  }, [dispatch]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const [editValue, setEditValue] = useState({});

  const getEditValue = (item) => {
    setEditValue(item);
  };

  const isEmptyObj = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  if (!isEmptyObj(editValue)) {
    return <Redirect to={`/admin/order-detail/${editValue._id}`} />;
  }

  const convertData = (data) => {
    let newData = [];
    // eslint-disable-next-line
    data.map((item) => {
      var obj = {};
      // eslint-disable-next-line
      ORDER_COLUMNS.map((a) => {
        if (a === "paymentResult") {
          obj["orderId"] = item[a]?.id;
        } else if (a === "status") {
          obj[a] = <span className={ORDER_STATUSES[item[a]]}>{item[a]}</span>;
        } else if (a === "totalPrice") {
          obj[a] = "$" + item[a];
        } else {
          obj[a] = item[a];
        }
      });

      newData.push(obj);
    });

    return newData;
  };

  return (
    <>
      <AdminBreadcrumb title="Order List" parent="Orders" />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5>Order List</h5>
          </div>
          <div className="card-body order-datatable">
            <div id="basicScenario" className="product-physical">
              {order && order.length > 0 && (
                <AdminTable
                  multiSelectOption={false}
                  myData={convertData(order)}
                  pageSize={10}
                  pagination={true}
                  // deteleRequest={deleteCategoryRequest}
                  getEditValue={(item) => getEditValue(item)}
                  class="-striped -highlight"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrder;
