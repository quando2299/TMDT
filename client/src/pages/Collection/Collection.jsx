import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumbs";
import CollectionItem from "../../components/CollectionItem/CollectionItem";
import Loading from "../../components/Loading/Loading";
import { categoryRequest } from "../../redux/category/category.actions";
import "./Collection.scss";

const Collection = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(categoryRequest());
  }, [dispatch]);

  const categorySelector = useSelector((state) => state.category);
  const { categories, loading } = categorySelector;

  return (
    <>
      <Helmet>
        <title>Nike shop | Collection</title>
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
          <Breadcrumbs path={history.location} />
          <section className="collection section-b-space">
            <div className="container">
              <div className="row">
                {categories &&
                  categories.map((item, index) => {
                    return (
                      <div className="col-lg-3 col-md-6" key={index}>
                        <CollectionItem item={item} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Collection;
