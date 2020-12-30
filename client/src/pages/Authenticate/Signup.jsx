import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { alertFailure } from "../../common/utils";
import BreadScrumb from "../../components/Breadcrumb/Breadcrumbs";
import CustomButton from "../../components/CustomButton/CustomButton";
import Loading from "../../components/Loading/Loading";
import { signupRequest } from "../../redux/user/user.actions";
import "./Signin.scss";

const Signup = ({ history }) => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);
  const { loading } = userSelector;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const { name, email, password, repeat_password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name && email && password) {
      if (password === repeat_password) {
        dispatch(signupRequest({ email, name, password }));
        setFormData({
          ...formData,
          name: "",
          email: "",
          password: "",
          repeat_password: "",
        });
      } else {
        alertFailure("Passwords don't matches!");
        setFormData({
          ...formData,
          name: "",
          email: "",
          password: "",
          repeat_password: "",
        });
      }
    } else {
      alertFailure("Please fill all fields!");
      setFormData({
        ...formData,
        name: "",
        email: "",
        password: "",
        repeat_password: "",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Nike shop | Signup</title>
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
                <div className="col-lg-12">
                  <h3>Login</h3>
                  <div className="theme-card">
                    <form className="theme-form">
                      <div className="form-row">
                        <div className="col-md-6">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            value={name}
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="Enter your name"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
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
                      </div>
                      <div className="form-row">
                        <div className="col-md-6">
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
                        <div className="col-md-6">
                          <label htmlFor="repeat_password">
                            Repeat password
                          </label>
                          <input
                            type="password"
                            value={repeat_password}
                            name="repeat_password"
                            className="form-control"
                            id="repeat_password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <CustomButton onClick={handleSubmit}>
                        register
                      </CustomButton>
                    </form>
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

export default Signup;
