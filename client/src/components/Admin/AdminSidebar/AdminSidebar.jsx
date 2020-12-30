import React, { Component } from "react";
import { Link } from "react-router-dom";
import man from "../../../assets/images/man.png";
import { ReactComponent as Logo } from "../../../assets/svg/crown.svg";
import { MENUITEMS } from "../../../common/constant";
import "./AdminSidebar.scss";
import { connect } from "react-redux";

class AdminSidebar extends Component {
  state = { selectedPath: "1", mainmenu: [] };

  onItemSelection = (arg, e) => {
    this.setState({ selectedPath: arg.path });
  };

  componentWillMount() {
    this.setState({
      mainmenu: MENUITEMS,
    });
  }

  componentDidMount() {
    var currentUrl = window.location.pathname;

    // eslint-disable-next-line
    this.state.mainmenu.filter((items) => {
      if (!items.children) {
        if (items.path === currentUrl) this.setNavActive(items);
        return false;
      }
      // eslint-disable-next-line
      items.children.filter((subItems) => {
        if (subItems.path === currentUrl) this.setNavActive(subItems);
        if (!subItems.children) return false;
        // eslint-disable-next-line
        subItems.children.filter((subSubItems) => {
          if (subSubItems.path === currentUrl) this.setNavActive(subSubItems);
        });
      });
    });
  }

  setNavActive(item) {
    // eslint-disable-next-line
    MENUITEMS.filter((menuItem) => {
      if (menuItem !== item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        // eslint-disable-next-line
        menuItem.children.filter((submenuItems) => {
          if (submenuItems !== item) {
            submenuItems.active = false;
          }
          if (submenuItems.children) {
            // eslint-disable-next-line
            submenuItems.children.map((childItem) => {
              childItem.active = false;
            });
            if (submenuItems.children.includes(item)) {
              submenuItems.active = true;
              menuItem.active = true;
            }
          }
        });
      }
    });
    item.active = !item.active;

    this.setState({
      mainmenu: MENUITEMS,
    });
  }

  render() {
    const mainmenu = this.state.mainmenu.map((menuItem, i) => (
      <li className={`${menuItem.active ? "active" : ""}`} key={i}>
        {menuItem.sidebartitle ? (
          <div className="sidebar-title">{menuItem.sidebartitle}</div>
        ) : (
          ""
        )}
        {menuItem.type === "sub" ? (
          // <a
          //   className="sidebar-header "
          //   href="javascript:void(0)"
          //   onClick={() => this.setNavActive(menuItem)}
          // >
          //   <menuItem.icon />
          //   <span>{menuItem.title}</span>
          //   <i className="fa fa-angle-right pull-right"></i>
          // </a>
          <a
            href="#"
            className="sidebar-header"
            onClick={() => this.setNavActive(menuItem)}
          >
            <menuItem.icon />
            <span>{menuItem.title}</span>
            <i className="fa fa-angle-right pull-right"></i>
          </a>
        ) : (
          ""
        )}
        {menuItem.type === "link" ? (
          <Link
            to={`${process.env.PUBLIC_URL}${menuItem.path}`}
            className={`sidebar-header ${menuItem.active ? "active" : ""}`}
            onClick={() => this.setNavActive(menuItem)}
          >
            <menuItem.icon />
            <span>{menuItem.title}</span>
            {menuItem.children ? (
              <i className="fa fa-angle-right pull-right"></i>
            ) : (
              ""
            )}
          </Link>
        ) : (
          ""
        )}
        {menuItem.children ? (
          <ul
            className={`sidebar-submenu ${menuItem.active ? "menu-open" : ""}`}
            style={
              menuItem.active
                ? { opacity: 1, transition: "opacity 500ms ease-in" }
                : {}
            }
          >
            {menuItem.children.map((childrenItem, index) => (
              <li
                key={index}
                className={
                  childrenItem.children
                    ? childrenItem.active
                      ? "active"
                      : ""
                    : ""
                }
              >
                {childrenItem.type === "sub" ? (
                  // <a
                  //   href="javascript:void(0)"
                  //   onClick={() => this.setNavActive(childrenItem)}
                  // >
                  //   <i className="fa fa-circle"></i>
                  //   {childrenItem.title}{" "}
                  //   <i className="fa fa-angle-right pull-right"></i>
                  // </a>
                  <Link onClick={() => this.setNavActive(childrenItem)}>
                    <i className="fa fa-circle"></i>
                    {childrenItem.title}{" "}
                    <i className="fa fa-angle-right pull-right"></i>
                  </Link>
                ) : (
                  ""
                )}

                {childrenItem.type === "link" ? (
                  <Link
                    to={`${process.env.PUBLIC_URL}${childrenItem.path}`}
                    className={childrenItem.active ? "active" : ""}
                    onClick={() => this.setNavActive(childrenItem)}
                  >
                    <i className="fa fa-circle"></i>
                    {childrenItem.title}{" "}
                  </Link>
                ) : (
                  ""
                )}
                {childrenItem.children ? (
                  <ul
                    className={`sidebar-submenu ${
                      childrenItem.active ? "menu-open" : "active"
                    }`}
                  >
                    {childrenItem.children.map((childrenSubItem, key) => (
                      <li
                        className={childrenSubItem.active ? "active" : ""}
                        key={key}
                      >
                        {childrenSubItem.type === "link" ? (
                          <Link
                            to={`${process.env.PUBLIC_URL}${childrenSubItem.path}`}
                            className={childrenSubItem.active ? "active" : ""}
                            onClick={() => this.setNavActive(childrenSubItem)}
                          >
                            <i className="fa fa-circle"></i>
                            {childrenSubItem.title}
                          </Link>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </li>
    ));

    return (
      <div className="page-sidebar">
        <div className="main-header-left d-none d-lg-block">
          <div className="logo-wrapper">
            <Link to="/">
              <Logo />
            </Link>
          </div>
        </div>
        <div className="sidebar custom-scrollbar">
          <div>
            <div className="sidebar-user text-center">
              <div>
                <img
                  className="rounded-circle lazyloaded blur-up"
                  src={man}
                  alt="logo"
                />
              </div>
              <h6>{this.props.auth.user.name}</h6>
              <p>Admin</p>
            </div>
          </div>
          <ul className="sidebar-menu">{mainmenu}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminSidebar);
