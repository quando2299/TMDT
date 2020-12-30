import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { productDetail } from "../../api/productAPI";
import { alertSuccess } from "../../common/utils";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumbs";
import CustomButton from "../../components/CustomButton/CustomButton";
import Loading from "../../components/Loading/Loading";
import ProductItem from "../../components/ProductItem/ProductItem";
import QuantityInput from "../../components/QuantityInput/QuantityInput";
import axiosService from "../../helpers/axiosService";
import { addItem } from "../../redux/cart/cart.actions";
import { addItemWishList } from "../../redux/wishlist/wishlist.actions";
import "./ProductDetail.scss";

const ProductDetail = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [vertical, setVertical] = useState(false);

  const loadProduct = async (slug) => {
    setLoading(true);
    const product = await productDetail(slug);

    if (product) {
      setProduct(product);

      axiosService
        .get(`/products/related/${product._id}`)
        .then((response) => setRelatedProducts(response.data.products))
        .catch((error) => {
          if (error.response) {
            setError(error.response.message);
          }
        });
    } else {
      setError("This product is not exists!");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (window.innerWidth > 576) {
      setVertical(true);
    }

    window.scrollTo(0, 0);
    const productId = props.match.params.slug;
    loadProduct(productId);
    setQuantity(1);
  }, [props]);

  const addToCart = (product) => {
    props.addItem(product, quantity);

    alertSuccess(`Add to cart ${product.name} successfulyl!`);
  };

  const addToWishList = (product) => {
    props.addItemWishList(product);
    alertSuccess(`Add to wishlist ${product.name} successfully!`);
  };

  const Increase = () => {
    setQuantity(quantity + 1);
  };

  const Decrease = () => {
    setQuantity(quantity - 1);
  };

  var settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
  };

  var productsnav = {
    vertical: vertical,
    verticalSwiping: vertical,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".product-right-slick",
    arrows: false,
    infinite: true,
    centerMode: false,
    dots: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var relatedSettings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Nike shop | Product detail page</title>
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
          {error ? (
            <div className="container">
              <div className="text-warning">{error}</div>
            </div>
          ) : (
            <>
              <Breadcrumbs
                path={history.location}
                productDetail={{ slug: product.slug, name: product.name }}
              />
              <section className="section-b-space collection-wrapper-detail">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-5 col-sm-10 col-xs-12">
                      <Slider
                        {...settings}
                        asNavFor={nav2}
                        ref={(s) => setNav1(s)}
                        className="product-right-slick"
                      >
                        {product.images &&
                          product.images.map((image, index) => (
                            <div key={index}>
                              <img
                                src={`${image}`}
                                className="img-fluid image_zoom_cls-0"
                                alt={product.name}
                              />
                            </div>
                          ))}
                      </Slider>
                    </div>
                    <div className="col-lg-1 col-sm-2 col-xs-12 pl-0">
                      <div className="row">
                        <div className="col-12 p-0 small-img-wrapper">
                          <Slider
                            {...productsnav}
                            asNavFor={nav1}
                            ref={(s) => setNav2(s)}
                            className="slider-nav"
                          >
                            {product.images &&
                              product.images.map((image, index) => (
                                <div
                                  key={index}
                                  className="small-img-container"
                                >
                                  <img
                                    src={`${image}`}
                                    key={index}
                                    alt={product.name}
                                    className="img-fluid blur-up lazyloaded"
                                  />
                                </div>
                              ))}
                          </Slider>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 rtl-text">
                      <div className="product-right">
                        <h2>{product.name}</h2>
                        {product.sale > 0 ? (
                          <h4>
                            <del>${product.price}</del>
                            <span> {product.sale}% off</span>
                          </h4>
                        ) : null}
                        <h3>${product.discount_price}</h3>
                        <div className="product-description border-product">
                          <span className="instock-cls">In stock</span>
                          <h6 className="product-title">quantity</h6>
                          <div className="qty-box flex">
                            <QuantityInput
                              detail={true}
                              quantity={quantity}
                              Increase={Increase}
                              Decrease={Decrease}
                            />
                          </div>
                        </div>
                        <div className="product-buttons">
                          <CustomButton onClick={() => addToCart(product)}>
                            add to cart
                          </CustomButton>
                          <CustomButton>buy now</CustomButton>
                        </div>
                        <div className="border-product">
                          <h6 className="product-title">product details</h6>
                          <p>{product.description}</p>
                        </div>
                        <div className="border-product">
                          <h6 className="product-title">category</h6>
                          <p>{product.category && product.category.name}</p>
                        </div>
                        <div className="border-product">
                          <h6 className="product-title">share it</h6>
                          <div className="product-icon flex">
                            <ul className="product-social">
                              <li>
                                <a
                                  href="https://www.facebook.com/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="fab fa-facebook-f"></i>
                                </a>
                              </li>
                            </ul>
                            <button
                              className="wishlist-btn"
                              onClick={() => addToWishList(product)}
                            >
                              <i className="fa fa-heart"></i>
                              <span className="title-font">
                                Add To WishList
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {relatedProducts.length > 0 ? (
                <div className="container related-container">
                  <section className="section-b-space">
                    <div className="row">
                      <div className="col-12">
                        <div className="text-center">
                          <h4>special offer</h4>
                          <h2>related products</h2>
                          <hr />
                        </div>
                      </div>
                      <div className="col">
                        <Slider
                          {...relatedSettings}
                          className="product-4 product-m no-arrow"
                        >
                          {relatedProducts &&
                            relatedProducts.map((item, index) => (
                              <div key={index}>
                                <ProductItem product={item} />
                              </div>
                            ))}
                        </Slider>
                      </div>
                    </div>
                  </section>
                </div>
              ) : null}
            </>
          )}
        </>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item, quantity) => dispatch(addItem(item, quantity)),
  addItemWishList: (item) => dispatch(addItemWishList(item)),
});

export default connect(null, mapDispatchToProps)(ProductDetail);
