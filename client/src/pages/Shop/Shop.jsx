import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SORTING_OPTION } from "../../common/constant";
import BreadScrumb from "../../components/Breadcrumb/Breadcrumbs";
import Filter from "../../components/Filter/Filter";
import FilterBar from "../../components/FilterBar/FilterBar";
import ProductList from "../../components/ProductList/ProductList";
import QuickView from "../../components/QuickView/QuickView";
import { categoryRequest } from "../../redux/category/category.actions";
import {
  setOrderFilter,
  setPriceRangeFilter,
  setSkip,
  toggleCategoryFilter
} from "../../redux/filter/filter.actions";
import { closeModal } from "../../redux/quickview/quickview.actions";
import "./Shop.scss";

const Shop = ({ history }) => {
  const dispatch = useDispatch();

  const categorySelector = useSelector((state) => state.category);
  const { categories } = categorySelector;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(categoryRequest());

    dispatch(closeModal());

    // Reset default filter
    dispatch(toggleCategoryFilter([]));
    dispatch(setSkip(0));
    dispatch(setOrderFilter(SORTING_OPTION[""]));
    dispatch(setPriceRangeFilter([0, 500]));
  }, [dispatch]);

  const openFilter = () => {
    document.querySelector(".collection-filter").style = "left: -15px";
  };

  return (
    <>
      <Helmet>
        <title>Nike shop | Shop page</title>
        <meta
          name="description"
          content="Multikart – Nike shop eCommerce Template."
        />
      </Helmet>
      <BreadScrumb path={history.location} />
      <section className="section-b-space">
        <div className="collection-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-3 collection-filter">
                <Filter categories={categories} />
              </div>
              <div className="collection-content col">
                <div className="page-main-content">
                  <div className="">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="top-banner-wrapper">
                          <Link to="/">
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/images/banner/shop-banner.jpg`}
                              className="img-fluid"
                              alt="shop banner"
                            />
                          </Link>
                          <div className="top-banner-content small-section">
                            <h4>fashion</h4>
                            <h5>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </h5>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum.
                            </p>
                          </div>
                        </div>
                        <div className="collection-product-wrapper">
                          <div className="product-top-filter">
                            <div className="container-fluid p-0">
                              <div className="row">
                                <div className="col-xl-12">
                                  <div className="filter-main-btn">
                                    <span
                                      onClick={openFilter}
                                      className="btn-filter"
                                    >
                                      <i className="fas fa-filter"></i> Filter
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <FilterBar />
                                </div>
                              </div>
                            </div>
                          </div>
                          <ProductList />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <QuickView />
    </>
  );
};

export default Shop;
