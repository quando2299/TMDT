import React from "react";
import Slider from "react-slick";
import img from "../../../assets/images/stats.png";
import "./AdminLogin.scss";
import AdminLoginTabset from "../../../components/Admin/AdminLoginTabset/AdminLoginTabset";

const AdminLogin = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
  };

  return (
    <div className="page-wrapper">
      <div className="authentication-box">
        <div className="container">
          <div className="row">
            <div className="col-md-5 p-0 card-left">
              <div className="card bg-primary">
                <div className="svg-icon">
                  <img src={img} className="img-fluid" alt="icon" />
                </div>
                <Slider className="single-item" {...settings}>
                  <div>
                    <div>
                      <h3>Welcome to Multikart</h3>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3>Welcome to Nike</h3>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3>Welcome to Multikart</h3>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy.
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
            <div className="col-md-7 p-0 card-right">
              <div className="card tab2-card">
                <div className="card-body">
                  <AdminLoginTabset />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
