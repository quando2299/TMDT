import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BreadScrumb from "../../components/Breadcrumb/Breadcrumbs";
import "./Dashboard.scss";
import { Helmet } from "react-helmet";

const Dashboard = ({ history }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const authSelector = useSelector((state) => state.auth);
  const { user } = authSelector;

  const openFilter = () => {
    document.querySelector(".dashboard-left").style = "left: 0;";
  };

  const closeFilter = () => {
    document.querySelector(".dashboard-left").style = "left: -350px;";
  };

  return (
    <>
      <Helmet>
        <title>Nike shop | Dashboard</title>
        <meta
          name="description"
          content="Multikart – Nike shop eCommerce Template."
        />
      </Helmet>
      <BreadScrumb path={history.location} />
      <section className="section-b-space section-dashboard">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="account-sidebar">
                <span className="btn-account" onClick={openFilter}>
                  My Account
                </span>
              </div>
              <div className="dashboard-left">
                <div className="collection-mobile-back">
                  <span className="filter-back" onClick={closeFilter}>
                    <i className="fas fa-angle-left"></i> back
                  </span>
                </div>
                <div className="block-content">
                  <ul>
                    <li className="active">
                      <Link to="/dashboard">Account info</Link>
                    </li>
                    <li>
                      <Link to="/orders">My orders</Link>
                    </li>
                    <li>
                      <Link to="/wishlist">My wishlist</Link>
                    </li>
                    <li>
                      <Link to="/newsletter">Newsletter</Link>
                    </li>
                    <li>
                      <Link to="/change-password">Change password</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="dashboard-right">
                <div className="dashboard">
                  <div className="page-title">
                    <h2>My Dashboard</h2>
                  </div>
                  <div className="welcome-msg">
                    <p>Hello, {user.name} !</p>
                    <p>
                      From your My Account Dashboard you have the ability to
                      view a snapshot of your recent account activity and update
                      your account information. Select a link below to view or
                      edit information.
                    </p>
                  </div>
                  <div className="box-account box-info">
                    <div className="box-head">
                      <h2>account information</h2>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="box">
                          <div className="box-title">
                            <h3>Contact Information</h3>
                            <Link to="/edit">Edit</Link>
                          </div>
                          <div className="box-content">
                            <h6>{user.name}</h6>
                            <h6>{user.email}</h6>
                            <h6>
                              <Link to="/change-password">Change Password</Link>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="box">
                          <div className="box-title">
                            <h3>Newsletters</h3>
                            <Link to="/">Edit</Link>
                          </div>
                          <div className="box-content">
                            <p>
                              You are currently not subscribed to any
                              newsletter.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="box">
                        <div className="box-title">
                          <h3>Address Book</h3>
                          <Link to="/">Manage Addresses</Link>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <h6>Default Billing Address</h6>
                            <address>
                              You have not set a default billing address.
                              <br />
                              <Link to="/">Edit Address</Link>
                            </address>
                          </div>
                          <div className="col-sm-6">
                            <h6>Default Shipping Address</h6>
                            <address>
                              You have not set a default shipping address.
                              <br />
                              <Link to="/">Edit Address</Link>
                            </address>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
