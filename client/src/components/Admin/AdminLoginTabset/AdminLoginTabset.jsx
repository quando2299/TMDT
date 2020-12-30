import React, { useState } from "react";
import { Unlock, User } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { loginAdminRequest } from "../../../redux/auth/auth.actions";
import "./AdminLoginTabset.scss";

const AdminLoginTabset = () => {
  // const [activeShow, setActiveShow] = useState(true);
  // const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.auth);
  const { isAuthenticate } = authSelector;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdminRequest({ email, password }));
    setFormData({
      ...formData,
      email: "",
      password: "",
    });
  };

  if (isAuthenticate) {
    return <Redirect to="/admin/dashboard" />;
  }

  // const clickActive = (e) => {
  //   document.querySelector(".nav-link").classList.remove("show");
  //   e.target.classList.add("show");
  // };

  return (
    <>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">
            <User />
            Login
          </Tab>
          <Tab className="nav-link">
            <Unlock />
            Register
          </Tab>
        </TabList>
        <TabPanel>
          <form className="form-horizontal auth-form">
            <div className="form-group">
              <input
                required=""
                name="email"
                type="email"
                className="form-control"
                placeholder="Username"
                id="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                required=""
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                id="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="form-terms">
              <div className="custom-control custom-checkbox mr-sm-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customControlAutosizing"
                />
                <label style={{ display: "block" }}>
                  <input
                    className="checkbox_animated"
                    id="chk-ani2"
                    type="checkbox"
                  />
                  Reminder Me{" "}
                  <span className="pull-right">
                    <Link to="/admin" className="btn-forgot-pass p-0">
                      lost your password
                    </Link>
                  </span>
                </label>
              </div>
            </div>
            <div className="form-button">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
            <div className="form-footer">
              <span>Or Login up with social platforms</span>
              <ul className="social">
                <li>
                  <Link to={"https://www.facebook.com/"}>
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                </li>
                <li>
                  <Link to={"https://plus.google.com/"}>
                    <i className="fab fa-google-plus-g"></i>
                  </Link>
                </li>
                <li>
                  <Link to={"https://twitter.com"}>
                    <i className="fab fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link to={"https://instagram.com"}>
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </form>
        </TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </>
  );
};

export default withRouter(AdminLoginTabset);
