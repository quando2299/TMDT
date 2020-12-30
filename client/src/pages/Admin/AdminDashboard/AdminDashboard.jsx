import React from "react";
import AdminBreadcrumb from "../../../components/Admin/AdminBreadcrumb/AdminBreadcrumb";

const AdminDashboard = () => {
  return (
    <>
      <AdminBreadcrumb title="Dashboard" parent="Dashboard" />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5>Dashboard</h5>
          </div>
          <div className="card-body"></div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
