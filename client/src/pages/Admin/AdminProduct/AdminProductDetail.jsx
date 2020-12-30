import React, { useEffect, useState } from "react";
import { productDetail } from "../../../api/productAPI";
import AdminBreadcrumb from "../../../components/Admin/AdminBreadcrumb/AdminBreadcrumb";
import Loading from "../../../components/Loading/Loading";
import Slider from "react-slick";
import "./AdminProductDetail.scss";

const AdminProductDetail = (props) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProduct = async (slug) => {
    setLoading(true);
    const product = await productDetail(slug);

    if (product) {
      setProduct(product);
    } else {
      setError("This product is not exists!");
    }

    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const slug = props.match.params.slug;
    loadProduct(slug);
  }, [props]);

  return (
    <>
      {loading ? (
        <div className="overlay" style={{ width: "100%" }}>
          <Loading />
        </div>
      ) : (
        <>
          {error ? (
            <div className="container">
              <div className="text-warning">{error}</div>
            </div>
          ) : (
            <>
              <AdminBreadcrumb title="Product Detail" parent="Products" />
              <div className="container-fluid">
                <div className="card">
                  <div className="row product-page-main card-body">
                    <div className="col-xl-4">
                      <Slider
                        asNavFor={nav2}
                        ref={(s) => setNav1(s)}
                        className="product-slider"
                      >
                        {product.images &&
                          product.images.map((i, index) => (
                            <div className="item" key={index}>
                              <img
                                src={`${i}`}
                                className="img-fluid"
                                alt={product.name}
                              />
                            </div>
                          ))}
                      </Slider>
                      <Slider
                        asNavFor={nav1}
                        ref={(s) => setNav2(s)}
                        slidesToShow={3}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        className="small-slick"
                      >
                        {product.images &&
                          product.images.map((i, index) => (
                            <div className="item" key={index}>
                              <img
                                src={`${i}`}
                                className="img-fluid"
                                alt={product.name}
                              />
                            </div>
                          ))}
                      </Slider>
                    </div>
                    <div className="col-xl-8">
                      <div className="product-page-details product-right mb-0">
                        <h2>{product.name}</h2>
                        <hr />
                        <h6 className="product-title">Product details</h6>
                        <p>{product.description}</p>
                        <h3>
                          ${product.discount_price} <del>${product.price}</del>
                        </h3>
                        <hr />
                        <h6 className="product-title">
                          Sold: <br />
                          <span>{product.sold}</span>
                        </h6>
                        <hr />
                        <h6 className="product-title">
                          Category: <br />
                          <span>
                            {product.category && product.category.name}
                          </span>
                        </h6>
                        <hr />
                        <div className="p-Date">
                          <h6 className="product-title">
                            Created at: <br />
                            <span>
                              {product.createdAt &&
                                new Date(product.createdAt)
                                  .toISOString()
                                  .substring(0, 10)}
                            </span>
                          </h6>

                          <h6 className="product-title">
                            Updated at <br />
                            <span>
                              {product.createdAt &&
                                new Date(product.updatedAt)
                                  .toISOString()
                                  .substring(0, 10)}
                            </span>
                          </h6>
                        </div>
                        <div
                          style={{ marginTop: "30px" }}
                          className="pull-right"
                        >
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                              props.history.push(
                                `/admin/product/${props.match.params.slug}`
                              )
                            }
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AdminProductDetail;
