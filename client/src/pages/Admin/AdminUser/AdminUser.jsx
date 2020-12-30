import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import { USER_COLUMNS } from "../../../common/constant";
import AdminBreadcrumb from "../../../components/Admin/AdminBreadcrumb/AdminBreadcrumb";
import AdminTable from "../../../components/Admin/AdminTable/AdminTable";
import {
  deleteUserRequest, getAllUserRequest,
  UpdateUserRoleRequest
} from "../../../redux/user/user.actions";
import "./AdminUser.scss";

const AdminUser = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);
  const { users } = userSelector;

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    userId: "",
    name: "",
    email: "",
    role: 0,
  });

  const { userId, name, email, role } = data;

  const onCloseModal = () => setOpen(false);

  const getUsers = useCallback(() => {
    dispatch(getAllUserRequest());
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const getEditValue = (item) => {
    // setEditValue(item);
    setData({
      ...data,
      userId: item._id,
      name: item.name,
      email: item.email,
      role: item.role.props.children === "User" ? 0 : 1,
    });
    setOpen(true);
  };

  const onChangeRole = () => {
    setData({
      ...data,
      role: !role,
    });
  };

  const convertData = (data) => {
    let newData = [];

    // eslint-disable-next-line
    data.map((item) => {
      let obj = {};
      // eslint-disable-next-line
      USER_COLUMNS.map((p) => {
        if (p === "role") {
          if (item[p] === 1) {
            obj[p] = <span className="badge badge--primary">Admin</span>;
          } else {
            obj[p] = <span className="badge badge--secondary">User</span>;
          }
        } else {
          obj[p] = item[p];
        }
      });

      newData.push(obj);
    });

    return newData;
  };

  const handleSubmit = () => {
    dispatch(UpdateUserRoleRequest(userId, { role }));
    setOpen(false);
  };

  return (
    <>
      <AdminBreadcrumb title="User List" parent="Users" />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5>User List</h5>
          </div>
          <div className="card-body order-datatable">
            <Modal open={open} onClose={onCloseModal}>
              <div className="modal-header">
                <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                  Update User
                </h5>
              </div>
              <div className="modal-body modal-user">
                <form>
                  <div className="form-group">
                    <label htmlFor="name" className="col-form-label">
                      Name :
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      disabled
                      value={name}
                      // onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="col-form-label">
                      Email :
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      disabled
                      value={email}
                      // onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="isImage"
                      type="checkbox"
                      className="custom-control-input"
                      checked={role}
                      onChange={onChangeRole}
                    />
                    <label className="custom-control-label" htmlFor="isImage">
                      Is Admin
                    </label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Update
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCloseModal}
                >
                  Close
                </button>
              </div>
            </Modal>
            <div id="basicScenario" className="product-physical">
              {users && users.length > 0 && (
                <AdminTable
                  multiSelectOption={true}
                  myData={convertData(users)}
                  pageSize={10}
                  pagination={true}
                  deteleRequest={deleteUserRequest}
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
