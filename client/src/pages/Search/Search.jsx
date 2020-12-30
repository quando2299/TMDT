import queryString from "query-string";
import React, { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumbs";
import ProductItem from "../../components/ProductItem/ProductItem";
import { allProductSearchRequest } from "../../redux/product/product.actions";
import "./Search.scss";

const Search = ({ history, location }) => {
  const dispatch = useDispatch();
  const productSelector = useSelector((state) => state.product);
  const { products } = productSelector;
  const parsed = queryString.parse(location.search);
  const { keyword } = parsed;

  const fetchSearchProduct = useCallback(() => {
    dispatch(allProductSearchRequest(keyword));
  }, [dispatch, keyword]);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchSearchProduct();
  }, [fetchSearchProduct]);

  return (
    <>
    <Helmet>
        <title>Nike shop | Search page</title>
        <meta
          name="description"
          content="Multikart – Nike shop eCommerce Template."
        />
      </Helmet>
      <Breadcrumbs path={history.location} />
      <section className="section-b-space section-product-search">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="flex search-header">
                <div className="search-result">
                  <h4>Search results for: {keyword}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {products.length > 0 &&
              products.map((item, index) => (
                <div className="col-xl-2 col-md-6" key={index}>
                  <ProductItem product={item} isList={true} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
