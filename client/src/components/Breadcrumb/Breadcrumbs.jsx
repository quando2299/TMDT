import React from "react";
import { Link } from "react-router-dom";
import { BREADBRUMBS } from "../../common/constant";
import "./Breadcrumbs.scss";

const BreadScrumb = (props) => {
  const renderBreadCrumbs = (
    path = props.path,
    productDetail = props.productDetail
  ) => {
    let pathArr;
    if (productDetail) {
      pathArr = ["Shop"];
    } else {
      pathArr = path.pathname.split("/");
      pathArr = pathArr.filter((path) => path !== "collections");

      pathArr.shift();

      if (
        pathArr.some((path) => BREADBRUMBS[path.toLowerCase()] === undefined)
      ) {
        return;
      }
    }
    let breadScrumb = pathArr.map((item) => {
      return (
        <li key={"breadScrumb" + item} className="breadcrumb-item">
          <Link to={BREADBRUMBS[item.toLowerCase()].to}>
            <span>{BREADBRUMBS[item.toLowerCase()].label}</span>
          </Link>
        </li>
      );
    });
    breadScrumb.unshift(
      <li key={"breadScrumb root"} className="breadcrumb-item">
        <Link to="/">
          <span>Homepage</span>
        </Link>
      </li>
    );
    if (productDetail) {
      breadScrumb.push(
        <li
          key={`breadScrumb ${productDetail.slug}`}
          className="breadcrumb-item"
        >
          <Link to={`/product/${productDetail.slug}`}>
            <span>{productDetail.name}</span>
          </Link>
        </li>
      );
    }
    return breadScrumb;
  };
  if (props.path === "/") return null;
  return (
    <div className="breadcrumb-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-title flex">
              <ul>{renderBreadCrumbs()}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadScrumb;
