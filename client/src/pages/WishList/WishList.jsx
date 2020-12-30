import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import img from "../../assets/images/empty-wishlist.png";
import BreadScrumb from "../../components/Breadcrumb/Breadcrumbs";
import CustomButton from "../../components/CustomButton/CustomButton";
import WishListItem from "../../components/WishListItem/WishListItem";
import { selectWishListItems } from "../../redux/wishlist/wishlist.selectors";
import "./WishList.scss";

const WishList = ({ history, wishListItems }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Helmet>
        <title>Nike shop | Wishlist page</title>
        <meta
          name="description"
          content="Multikart – Nike shop eCommerce Template."
        />
      </Helmet>
      <BreadScrumb path={history.location} />
      {wishListItems.length > 0 ? (
        <section className="cart-section-wishlist section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <table className="table cart-table table-responsive-xs">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">image</th>
                      <th scope="col">product name</th>
                      <th scope="col">price</th>
                      <th scope="col">availability</th>
                      <th scope="col">action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishListItems.map((item, index) => (
                      <WishListItem key={index} product={item} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row cart-buttons">
              <div className="col-7">
                <CustomButton onClick={() => history.push("/shop")}>
                  continue shopping
                </CustomButton>
              </div>
              <div className="col-5">
                <CustomButton onClick={() => history.push("/checkout")}>
                  checkout
                </CustomButton>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="cart-section-wishlist section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div>
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <img
                      src={img}
                      className="img-fluid mb-4"
                      alt="empty-icon"
                    />
                    <h3>
                      <strong>WhishList is Empty</strong>
                    </h3>
                    <h4>Explore more shortlist some items.</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  wishListItems: selectWishListItems,
});

export default withRouter(connect(mapStateToProps)(WishList));
