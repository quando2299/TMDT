import React, { useState } from "react";
import { AlignLeft, Maximize2, MoreHorizontal } from "react-feather";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import man from "../../../assets/images/man.png";
import { ReactComponent as Logo } from "../../../assets/svg/crown.svg";
import { signoutRequest } from "../../../redux/auth/auth.actions";
import "./AdminHeader.scss";

const AdminHeader = ({ signoutRequest, history }) => {
  const [sidebar, setSidebar] = useState(true);
  const [navMenus, setNavMenus] = useState(false);

  const toggleNavMenus = () => {
    setNavMenus(!navMenus);
  };

  const goFull = () => {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };

  const openCloseSidebar = () => {
    if (sidebar) {
      setSidebar(false);
      document.querySelector(".page-main-header").classList.add("open");
      document.querySelector(".page-sidebar").classList.add("open");
    } else {
      setSidebar(true);
      document.querySelector(".page-main-header").classList.remove("open");
      document.querySelector(".page-sidebar").classList.remove("open");
    }
  };

  return (
    <>
      <div className="page-main-header ">
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none">
            <div className="logo-wrapper">
              <Link to="/">
                <Logo />
              </Link>
            </div>
          </div>
          <div className="mobile-sidebar">
            <div className="media-body text-right switch-sm">
              <label className="switch">
                <div style={{ cursor: "pointer" }} onClick={openCloseSidebar}>
                  <AlignLeft />
                </div>
              </label>
            </div>
          </div>
          <div className="nav-right col">
            {/* <ul className={"nav-menus " + (this.state.navMenus ? "open" : "")}>
              <li>
                <SearchHeader />
              </li>
              <li>
                <a onClick={this.goFull} className="text-dark" href="#!">
                  <Maximize2 />
                </a>
              </li>
              <li className="onhover-dropdown">
                <a className="txt-dark" href="#">
                  <h6>EN</h6>
                </a>
                <Language />
              </li>

              <li className="onhover-dropdown">
                <Bell />
                <span className="badge badge-pill badge-primary pull-right notification-badge">
                  3
                </span>
                <span className="dot"></span>
                <Notification />
              </li>
              <li>
                <a onClick={this.showRightSidebar}>
                  <MessageSquare />
                  <span className="dot"></span>
                </a>
              </li>
              <User_menu />
            </ul> */}
            {/* <div
              className="d-lg-none mobile-toggle pull-right"
              onClick={() => this.toggle()}
            >
              <MoreHorizontal />
            </div> */}
            <ul className={"nav-menus " + (navMenus ? "open" : "")}>
              <li style={{ cursor: "pointer" }}>
                <div onClick={goFull}>
                  <Maximize2 />
                </div>
              </li>
              <li className="onhover-dropdown">
                <h6>EN</h6>
              </li>
              <li className="onhover-dropdown">
                <div className="flex align-items-center">
                  <img
                    className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                    src={man}
                    alt="header-user"
                  />
                  <div className="dotted-animation">
                    <span className="animate-circle"></span>
                    <span className="main-circle"></span>
                  </div>
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                  <li>
                    <Link to="/admin">
                      <i data-feather="user"></i>Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin">
                      <i data-feather="settings"></i>Settings
                    </Link>
                  </li>
                  <li>
                    <span
                      onClick={() => {
                        signoutRequest();
                        history.push("/admin");
                      }}
                    >
                      <i data-feather="log-out"></i>Logout
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
            <div
              className="d-lg-none mobile-toggle pull-right"
              onClick={toggleNavMenus}
            >
              <MoreHorizontal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signoutRequest: () => dispatch(signoutRequest()),
});

export default withRouter(connect(null, mapDispatchToProps)(AdminHeader));
