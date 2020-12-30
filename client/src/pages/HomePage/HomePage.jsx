import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getProducts } from "../../api/productAPI";
import { SORTING_BY_PRODUCTS } from "../../common/constant";
import ProductItem from "../../components/ProductItem/ProductItem";
import QuickView from "../../components/QuickView/QuickView";
import SliderBanner from "../../components/SliderBanner/SliderBanner";
import { closeModal } from "../../redux/quickview/quickview.actions";
import "./HomePage.scss";

const HomePage = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);

  const loadProductsBySell = async () => {
    const data = await getProducts(SORTING_BY_PRODUCTS.sold);

    if (data) {
      setProductBySell(data);
    }
  };

  const loadProductsByArrival = async () => {
    const data = await getProducts(SORTING_BY_PRODUCTS.createdAt);

    if (data) {
      setProductByArrival(data);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProductsBySell();
    loadProductsByArrival();

    // Always close modal when redirect to Homepage
    dispatch(closeModal());
  }, [dispatch]);

  const settings = {
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
        breakpoint: 480,
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
        <title>Nike shop | Home page</title>
        <meta
          name="description"
          content="Multikart – Nike shop eCommerce Template."
        />
      </Helmet>
      <SliderBanner />
      <div className="homepage-container">
        <section className="section-b-space">
          <div className="container">
            <div className="row banner-timer">
              <div className="col-md-6">
                <div className="banner-text">
                  <h2>
                    Save <span>30% off</span> All products
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <h4>special offer</h4>
                  <h2>new arrival</h2>
                  <hr />
                </div>
              </div>
              <div className="col">
                <Slider {...settings} className="product-4 product-m no-arrow">
                  {productByArrival.map((item, index) => (
                    <div key={index}>
                      <ProductItem product={item} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>

        <section className="section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <h4>special offer</h4>
                  <h2>best seller</h2>
                  <hr />
                </div>
              </div>
              <div className="col">
                <Slider {...settings} className="product-4 product-m no-arrow">
                  {productBySell.map((item, index) => (
                    <div key={index}>
                      <ProductItem product={item} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>

        <section className="section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Link to="/shop">
                  <div className="collection-banner">
                    <div className="img-part img-part--1 blur-up"></div>
                    <div className="contain-banner">
                      <div>
                        <h4>minimum 10% off</h4>
                        <h2>new watch</h2>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/shop">
                  <div className="collection-banner">
                    <div className="img-part img-part--2 blur-up"></div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/shop">
                  <div className="collection-banner">
                    <div className="img-part img-part--3 blur-up"></div>
                    <div className="contain-banner">
                      <div>
                        <h4>minimum 10% off</h4>
                        <h2>new watch</h2>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <QuickView />
    </>
  );
};

export default HomePage;
