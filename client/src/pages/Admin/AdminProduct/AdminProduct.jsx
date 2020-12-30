import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { PRODUCT_COLUMNS } from "../../../common/constant";
import AdminBreadcrumb from "../../../components/Admin/AdminBreadcrumb/AdminBreadcrumb";
import AdminTable from "../../../components/Admin/AdminTable/AdminTable";
import {
  allProductSearchRequest,
  deleteProductRequest,
} from "../../../redux/product/product.actions";

const AdminProduct = ({ history }) => {
  const dispatch = useDispatch();
  const productSelector = useSelector((state) => state.product);
  const { products } = productSelector;

  const [editValue, setEditValue] = useState({});
  const [action, setAction] = useState(null);

  const getProducts = useCallback(() => {
    dispatch(allProductSearchRequest(""));
  }, [dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const convertData = (data) => {
    let newData = [];

    // eslint-disable-next-line
    data.map((item) => {
      let obj = {};
      // eslint-disable-next-line
      PRODUCT_COLUMNS.map((p) => {
        if (p === "images") {
          obj["image"] = (
            <img
              src={item.images[0]}
              style={{ width: 50, height: 50 }}
              alt={item.name}
            />
          );
        } else if (p === "discount_price") {
          obj["price"] = item[p];
        } else if (p === "category") {
          obj[p] = item[p].name;
        } else {
          obj[p] = item[p];
        }
      });

      newData.push(obj);
    });

    return newData;
  };

  const isEmptyObj = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, "");

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to =
      "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    // Remove invalid chars
    str = str
      .replace(/[^a-z0-9 -]/g, "")
      // Collapse whitespace and replace by -
      .replace(/\s+/g, "-")
      // Collapse dashes
      .replace(/-+/g, "-");

    return str;
  }

  const getEditValue = (item, action) => {
    setEditValue(item);
    setAction(action);
  };

  if (!isEmptyObj(editValue) && action === "detail") {
    return <Redirect to={`/admin/product-detail/${slugify(editValue.name)}`} />;
  } else if (!isEmptyObj(editValue) && action === "update") {
    return <Redirect to={`/admin/product/${slugify(editValue.name)}`} />;
  }

  return (
    <>
      <AdminBreadcrumb title="Product List" parent="Products" />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5>Product List</h5>
          </div>
          <div className="card-body order-datatable">
            <div className="btn-popup pull-right">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => history.push("/admin/products/create")}
              >
                Add Product
              </button>
            </div>
            <div className="clearfix"></div>
            <div id="basicScenario" className="product-physical">
              {products && products.length > 0 && (
                <AdminTable
                  allSelectOption={true}
                  myData={convertData(products)}
                  pageSize={10}
                  pagination={true}
                  deteleRequest={deleteProductRequest}
                  getEditValue={(item, action) => getEditValue(item, action)}
                  class="-striped -highlight"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(AdminProduct);
