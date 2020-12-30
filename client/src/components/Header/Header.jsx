import React from "react";
import { connect, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { ReactComponent as Logo } from "../../assets/svg/crown.svg";
import { signoutRequest } from "../../redux/auth/auth.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { selectWishListItemsCount } from "../../redux/wishlist/wishlist.selectors";
import CartDropDown from "../CartDropDown/CartDropDown";
import "./Header.scss";

const Header = ({ itemCount, signoutRequest, history }) => {
  const authSelector = useSelector((state) => state.auth);
  const { user, isAuthenticate } = authSelector;

  const openNav = () => {
    document.querySelector(".nav-menu").style = "right: 0";
    document
      .querySelector(".sidebar-overlay")
      .setAttribute("style", "opacity: 0.8; visibility: visible;");
  };

  const closeNav = () => {
    document.querySelector(".nav-menu").style = "right: -410px";
    document
      .querySelector(".sidebar-overlay")
      .setAttribute("style", "opacity: 0; visibility: hidden;");
  };

  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
  };

  const closeSearch = () => {
    document.getElementById("search-overlay").style.display = "none";
  };

  const onSubmitSearch = (e) => {
    history.push("/search");
  };

  return (
    <>
      <header id="sticky" className="sticky">
        <div className="mobile-fix-option"></div>
        <div className="top-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="header-contact">
                  <ul>
                    <li>Welcome to Our store Nike</li>
                    <li>
                      <i className="fas fa-phone"></i>Call Us: 070 311 9971
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 text-right">
                <ul className="header-dropdown">
                  <li className="mobile-wishlist">
                    <Link to="/wishlist">
                      <i className="fas fa-heart"></i>Wishlist
                    </Link>
                  </li>
                  <li className="onhover-dropdown mobile-account">
                    {isAuthenticate ? (
                      <>
                        <i className="fas fa-user"></i>Hello, {user.name}
                        <ul className="onhover-show-div">
                          <li>
                            <Link to="/dashboard">Dashboard</Link>
                          </li>
                          <li>
                            <span
                              style={{ cursor: "pointer", fontWeight: 400 }}
                              onClick={() => {
                                signoutRequest();
                                history.push("/");
                              }}
                            >
                              Sign out
                            </span>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user"></i>My Account
                        <ul className="onhover-show-div">
                          <li>
                            <Link to="/signin">Login</Link>
                          </li>
                          <li>
                            <Link to="/signup">Register</Link>
                          </li>
                        </ul>
                      </>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="main-menu">
                <div className="menu-left">
                  <div className="brand-logo">
                    <Link to="/">
                      <Logo />
                    </Link>
                  </div>
                </div>
                <div className="menu-right pull-right">
                  <div>
                    <div className="main-navbar">
                      <div id="mainnav">
                        <div className="toggle-nav" onClick={openNav}>
                          <i className="fas fa-bars"></i>
                        </div>
                        <div className="nav-menu-main">
                          <div
                            className="sidebar-overlay"
                            onClick={closeNav}
                          ></div>
                          <ul className="nav-menu" style={{ right: "-410px" }}>
                            <li className="back-btn" onClick={closeNav}>
                              <div className="mobile-back text-right">
                                <span>Back</span>
                                <i className="fas fa-angle-right pl-2"></i>
                              </div>
                            </li>
                            <li>
                              <Link to="/" className="nav-link">
                                Home
                              </Link>
                            </li>
                            <li>
                              <Link to="/shop" className="nav-link">
                                Shop
                              </Link>
                            </li>
                            {/* <li>
                              <Link to="/collection" className="nav-link">
                                Collection
                              </Link>
                            </li> */}
                            <li>
                              <Link to="/about-us" className="nav-link">
                                About Us
                              </Link>
                            </li>
                            <li>
                              <Link to="/contact-us" className="nav-link">
                                Contact Us
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="icon-nav">
                      <ul>
                        <li className="onhover-div mobile-search">
                          <div>
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/images/icon/search.png`}
                              alt="search"
                              className="img-fluid"
                              onClick={openSearch}
                            />
                            <i
                              className="fas fa-search"
                              onClick={openSearch}
                            ></i>
                          </div>
                        </li>
                        {/*Header Cart Component */}
                        <li className="onhover-div mobile-cart">
                          <div className="cart-qty-cls">{itemCount}</div>
                          <Link to="/cart">
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/images/icon/cart.png`}
                              alt="search"
                              className="img-fluid"
                            />
                            <i className="fas fa-shopping-cart"></i>
                          </Link>
                          <CartDropDown />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div id="search-overlay" className="search-overlay">
        <div>
          <span
            className="closebtn"
            title="Close Overlay"
            onClick={closeSearch}
          >
            ×
          </span>
          <div className="overlay-content">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <form onSubmit={onSubmitSearch}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="search"
                        name="keyword"
                        placeholder="Search a Product"
                      />
                    </div>
                    <button type="submit" className="btn">
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
  itemWishList: selectWishListItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
  signoutRequest: () => dispatch(signoutRequest()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
