import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import BreadScrumb from "../../components/Breadcrumb/Breadcrumbs";
import CustomButton from "../../components/CustomButton/CustomButton";
import Loading from "../../components/Loading/Loading";
import { loginRequest } from "../../redux/auth/auth.actions";
import "./Signin.scss";

const Signin = ({ history }) => {
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.auth);
  const { loading, isAuthenticate } = authSelector;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const { email, password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginRequest({ email, password }));
    setFormData({
      ...formData,
      email: "",
      password: "",
    });
  };

  if (isAuthenticate) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>Nike shop | Signin</title>
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
          <section className="section-login-page section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h3>Login</h3>
                  <div className="theme-card">
                    <form className="theme-form">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          value={email}
                          name="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter your email"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          value={password}
                          name="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter your password"
                          onChange={handleChange}
                        />
                      </div>
                      <CustomButton onClick={handleSubmit}>login</CustomButton>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 right-login">
                  <h3>New Customer</h3>
                  <div className="theme-card authentication-right">
                    <h6 className="title-font">Create A Account</h6>
                    <p>
                      Sign up for a free account at our store. Registration is
                      quick and easy. It allows you to be able to order from our
                      shop. To start shopping click register.
                    </p>
                    <CustomButton onClick={() => history.push("/signup")}>
                      create an account
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default withRouter(Signin);
