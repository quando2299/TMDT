import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { alertFailure } from "../../common/utils";
import BreadScrumb from "../../components/Breadcrumb/Breadcrumbs";
import CustomButton from "../../components/CustomButton/CustomButton";
import Loading from "../../components/Loading/Loading";
import { changePasswordRequest } from "../../redux/user/user.actions";
import "./Signin.scss";

const ChangePassword = ({ history }) => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);
  const { loading } = userSelector;
  const authSelector = useSelector((state) => state.auth);
  const { user } = authSelector;
  const [formData, setFormData] = useState({
    password: "",
    new_password: "",
    repeat_new_password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const { password, new_password, repeat_new_password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password && new_password && repeat_new_password) {
      if (new_password === repeat_new_password) {
        dispatch(
          changePasswordRequest(user._id, {
            email: user.email,
            password,
            new_password,
          })
        );
        setFormData({
          ...formData,
          password: "",
          new_password: "",
          repeat_new_password: "",
        });
      } else {
        alertFailure("Passwords don't matches!");
        setFormData({
          ...formData,
          password: "",
          new_password: "",
          repeat_new_password: "",
        });
      }
    } else {
      alertFailure("Please fill all fields!");
    }
  };

  return (
    <>
      <Helmet>
        <title>Nike shop | Change password</title>
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
                  <h3>Change password</h3>
                  <div className="theme-card">
                    <form className="theme-form">
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
                        {/* <div className="col-md-6">
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
                        </div> */}
                      </div>
                      <div className="form-row">
                        <div className="col-md-6">
                          <label htmlFor="new_password">New Password</label>
                          <input
                            type="password"
                            value={new_password}
                            name="new_password"
                            className="form-control"
                            id="new_password"
                            placeholder="Enter your new password"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="repeat_new_password">
                            Repeat new password
                          </label>
                          <input
                            type="password"
                            value={repeat_new_password}
                            name="repeat_new_password"
                            className="form-control"
                            id="repeat_new_password"
                            placeholder="Enter your new password"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <CustomButton onClick={handleSubmit}>Update</CustomButton>
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

export default ChangePassword;
