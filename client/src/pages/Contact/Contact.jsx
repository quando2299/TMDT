import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumbs";
import CustomButton from "../../components/CustomButton/CustomButton";
import Loading from "../../components/Loading/Loading";
import { sendFeedbackRequest } from "../../redux/contact/contact.actions";
import "./Contact.scss";

const Contact = ({ history }) => {
  const dispatch = useDispatch();
  const contactSelector = useSelector((state) => state.contact);
  const { loading } = contactSelector;

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    review: "",
  });
  const [validation, setValidation] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    review: "",
  });

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );

    const { first_name, last_name, phone, email, review } = data;

    if (
      first_name === "" ||
      last_name === "" ||
      phone === "" ||
      email === "" ||
      review === ""
    ) {
      return false;
    }

    return valid;
  };

  const validPhoneRegex = RegExp(
    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
  );

  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    switch (name) {
      case "first_name":
        validation.first_name =
          value.length < 2 ? "First name must be 2 characters long!" : "";
        break;
      case "last_name":
        validation.first_name =
          value.length < 2 ? "Last name must be 2 characters long!" : "";
        break;
      case "review":
        validation.review =
          value.length < 2 ? "Review must be 2 characters long!" : "";
        break;
      case "email":
        validation.email = !validEmailRegex.test(value)
          ? "Email is not valid!"
          : "";
        break;
      case "phone":
        validation.phone = !validPhoneRegex.test(value)
          ? "Phone is not valid!"
          : "";
        break;
      default:
        break;
    }

    setValidation({ ...validation });
  };

  const sendFeedback = (e) => {
    e.preventDefault();
    if (validateForm(validation)) {
      dispatch(sendFeedbackRequest({ ...data }));
      setData({
        ...data,
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        review: "",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Nike shop | Contact</title>
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
          <Breadcrumbs path={history.location} />
          <section className="contact-page section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2748534625835!2d106.6462093147491!3d10.790248492312173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eb4ec973df9%3A0x58b9899a0032a2d9!2zMjA5IFbDtSBUaMOgbmggVHJhbmcsIFBoxrDhu51uZyAxMSwgVMOibiBCw6xuaCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1604115994236!5m2!1svi!2s"
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex="0"
                    title="map"
                  ></iframe>
                </div>
                <div className="col-lg-5">
                  <div className="contact-right">
                    <ul>
                      <li>
                        <div className="contact-icon">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/icon/phone.png`}
                            alt="Phone"
                          />
                          <h6>Contact Us</h6>
                        </div>
                        <div className="media-body">
                          <p>+84 70 - 311 - 9971</p>
                          <p>+84 92 - 969 - 3126</p>
                        </div>
                      </li>
                      <li>
                        <div className="contact-icon">
                          <i className="fas fa-map-marker-alt"></i>
                          <h6>Address</h6>
                        </div>
                        <div className="media-body">
                          <p>209 Vo Thanh Trang, Tan Binh District</p>
                          <p>Ho Chi Minh City</p>
                        </div>
                      </li>
                      <li>
                        <div className="contact-icon">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/icon/email.png`}
                            alt="Email"
                          />
                          <h6>Address</h6>
                        </div>
                        <div className="media-body">
                          <p>quando.2299@gmail.com</p>
                          <p>info@shopnike.com</p>
                        </div>
                      </li>
                      <li>
                        <div className="contact-icon">
                          <i className="fas fa-fax"></i>
                          <h6>Fax</h6>
                        </div>
                        <div className="media-body">
                          <p>quando.2299@gmail.com</p>
                          <p>info@shopnike.com</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row form-contact">
                <div className="col-sm-12">
                  <form className="theme-form">
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="first_name">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                          value={data.first_name}
                          onChange={handleChange}
                          placeholder="Enter Your name"
                          required=""
                        />
                        {validation.first_name.length > 0 && (
                          <div className="error">{validation.first_name}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="last_name"
                          name="last_name"
                          value={data.last_name}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          required=""
                        />
                        {validation.last_name.length > 0 && (
                          <div className="error">{validation.last_name}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone">Phone number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={data.phone}
                          onChange={handleChange}
                          placeholder="Enter your number"
                          required=""
                        />
                        {validation.phone.length > 0 && (
                          <div className="error">{validation.phone}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                          placeholder="Email"
                          required=""
                        />
                        {validation.email.length > 0 && (
                          <div className="error">{validation.email}</div>
                        )}
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="review">Write Your Message</label>
                        <textarea
                          className="form-control"
                          placeholder="Write Your Message"
                          id="review"
                          name="review"
                          value={data.review}
                          onChange={handleChange}
                          rows="6"
                        ></textarea>
                        {validation.review.length > 0 && (
                          <div className="error">{validation.review}</div>
                        )}
                      </div>
                      <div className="col-md-12">
                        <CustomButton onClick={sendFeedback}>
                          Send Your Message
                        </CustomButton>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Contact;
