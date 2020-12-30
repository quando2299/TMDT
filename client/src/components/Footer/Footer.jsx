import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ReactComponent as Logo } from "../../assets/svg/crown.svg";
import { sendEmailRequest } from "../../redux/email/email.actions";
import BackToTop from "../BackToTop/BackToTop";
import CustomButton from "../CustomButton/CustomButton";
import "./Footer.scss";

const Footer = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    dispatch(sendEmailRequest({ email }));
    setEmail("");
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setEmail(value);
  };

  return (
    <>
      <footer>
        <div className="light-layout">
          <div className="container">
            <div className="small-section border-section border-top-0">
              <div className="row">
                <div className="col-lg-6">
                  <div className="subscribe">
                    <div>
                      <h4>KNOW IT ALL FIRST!</h4>
                      <p>
                        Never Miss Anything From Nike By Signing Up To Our
                        Newsletter.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <form className="form-inline subscribe-form">
                    <div className="form-group mx-sm-3">
                      <input
                        type="email"
                        value={email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your email"
                      />
                    </div>
                    <CustomButton onClick={sendEmail}>subscribe</CustomButton>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="section-footer section-b-space light-layout">
          <div className="container">
            <div className="row footer-theme partition-f">
              <div className="col-lg-4 col-md-6">
                <div className="footer-content-main">
                  <div className="footer-logo">
                    <Link to="/">
                      <Logo />
                    </Link>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Saepe iure quas placeat nobis optio esse obcaecati nulla,
                    quam accusantium dolores culpa aliquid aut quia distinctio
                    sint dicta officiis quae! Accusantium!
                  </p>
                  <div className="footer-social">
                    <ul>
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
                      <li>
                        <Link to={"https://rss.com/"}>
                          <i className="fas fa-rss"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col offset-xl-1">
                <div className="sub-title">
                  <div className="footer-title">
                    <h4>my account</h4>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="sub-title">
                  <div className="footer-title">
                    <h4>why we choose</h4>
                  </div>
                  <div className="footer-content">
                    <ul className="footer-sub-item">
                      <li>
                        <Link to="/">shipping & return</Link>
                      </li>
                      <li>
                        <Link to="/">contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="sub-title">
                  <div className="footer-title">
                    <h4>store information</h4>
                  </div>
                  <div className="footer-content">
                    <ul className="contact-list">
                      <li>
                        <i className="fas fa-map-marker-alt"></i>Nike Shop
                      </li>
                      <li>
                        <i className="fas fa-phone-alt"></i>Call Us:
                        123-456-7898
                      </li>
                      <li>
                        <i className="far fa-envelope"></i>Email Us:{" "}
                        <a href="mailto:vuledev2905@gmail.com">
                          vuledev2905@gmail.com
                        </a>
                      </li>
                      <li>
                        <i className="fas fa-fax"></i>Fax: 123456
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="sub-footer">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="footer-end">
                  <p>
                    <i className="far fa-copyright"></i> 2020 powered by LHV
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="payment-card-bottom">
                  <ul>
                    <li>
                      <Link to="/">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/images/icon/visa.png`}
                          alt="visa"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/images/icon/mastercard.png`}
                          alt="mastercard"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/images/icon/paypal.png`}
                          alt="paypal"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/images/icon/american-express.png`}
                          alt="american-express"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/images/icon/discover.png`}
                          alt="discover"
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  );
};

export default Footer;
