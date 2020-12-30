import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProductRequest } from "../../redux/product/product.actions";
import { setSkip } from "../../redux/filter/filter.actions";
import CustomButton from "../CustomButton/CustomButton";
import Loading from "../Loading/Loading";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.scss";

const ProductList = () => {
  const dispatch = useDispatch();

  const productSelector = useSelector((state) => state.product);
  const { products, size, loading: loadingProduct } = productSelector;
  const filterSelector = useSelector((state) => state.filter);
  const { filter: filterObj, limit, skip, order, sortBy } = filterSelector;

  const getFilterProducts = useCallback(() => {
    const newfitlerObj = {
      skip,
      limit,
      filters: filterObj,
      order,
      sortBy,
    };

    dispatch(allProductRequest(newfitlerObj, skip));
  }, [dispatch, filterObj, limit, skip, order, sortBy]);

  useEffect(() => {
    getFilterProducts();
  }, [getFilterProducts]);

  const onLoadMore = () => {
    dispatch(setSkip(skip + limit));
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div className="product-landing-action">
          <CustomButton onClick={onLoadMore}>Load more</CustomButton>
        </div>
      )
    );
  };

  return (
    <div className="product-wrapper-grid">
      <div className="container-fluid">
        <div className="product-list-row row">
          {loadingProduct ? (
            <div className="flex jf-center mtb100" style={{ width: "100%" }}>
              <Loading />
            </div>
          ) : (
            products &&
            products.map((item, index) => (
              <div className="col-xl-3 col-md-6 col-grid-box" key={index}>
                <ProductItem product={item} isList={true} />
              </div>
            ))
          )}
        </div>
        <div className="row">
          <div className="col-12">{loadMoreButton()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
