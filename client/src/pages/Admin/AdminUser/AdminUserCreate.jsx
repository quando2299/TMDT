import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminBreadcrumb from "../../../components/Admin/AdminBreadcrumb/AdminBreadcrumb";
import AdminTable from "../../../components/Admin/AdminTable/AdminTable";
import { getAllUserRequest } from "../../../redux/user/user.actions";
import "./AdminUser.scss";

const AdminUser = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);
  const { users } = userSelector;

  const [editValue, setEditValue] = useState({});

  const getUsers = useCallback(() => {
    dispatch(getAllUserRequest());
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const getEditValue = (item) => {
    setEditValue(item);
  };

  const convertData = (data) => {
    let newData = [...data];

    // eslint-disable-next-line
    newData.map((item) => {
      if (item.role === 0) {
        item.role = <span className="badge badge--primary">User</span>;
      } else {
        item.role = <span className="badge badge--secondary">Admin</span>;
      }

      delete item.resetPasswordLink;
      delete item.history;
      delete item.salt;
      delete item.hashed_password;
    });

    return newData;
  };

  return (
    <>
      <AdminBreadcrumb title="Order List" parent="Orders" />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5>User List</h5>
          </div>
          <div className="card-body order-datatable">
            <div id="basicScenario" className="product-physical">
              {users && users.length > 0 && (
                <AdminTable
                  multiSelectOption={true}
                  myData={convertData(users)}
                  pageSize={10}
                  pagination={true}
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

export default AdminUser;
