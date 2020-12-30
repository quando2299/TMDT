import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { alertSuccess } from "../../common/utils";
import { addItem } from "../../redux/cart/cart.actions";
import { closeModal } from "../../redux/quickview/quickview.actions";
import CustomButton from "../CustomButton/CustomButton";
import QuantityInput from "../QuantityInput/QuantityInput";
import "./QuickView.scss";

const QuickView = ({ history }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const Increase = () => {
    setQuantity(quantity + 1);
  };

  const Decrease = () => {
    setQuantity(quantity - 1);
  };

  const addToCart = (product) => {
    dispatch(addItem(product, quantity));

    alertSuccess(`Add to cart ${product.name} successfulyl!`);
  };

  const quickViewSelector = useSelector((state) => state.quickView);
  const { open, product } = quickViewSelector;

  return (
    <div className={"quickview overlay " + (open ? "flex" : "none")}>
      <div className="modal">
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content quick-view-modal">
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6 col-xs-12">
                  <div className="quick-view-img">
                    <img
                      src={product?.images[0]}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-lg-6 rtl-text">
                  <div className="product-right">
                    <h2>{product?.name}</h2>
                    <h3>
                      $
                      {product?.discount_price}
                    </h3>
                    <div className="border-product">
                      <h6 className="product-title">Product Details</h6>
                      <p>{product?.description}</p>
                    </div>
                    <div className="product-description border-product">
                      <h6 className="product-title">Quantity</h6>
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
                      <CustomButton
                        onClick={() =>
                          history.push(`/product/${product?.slug}`)
                        }
                      >
                        view detail
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="close-btn"
          onClick={() => {
            dispatch(closeModal());
            setQuantity(1);
          }}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>
    </div>
  );
};

export default withRouter(QuickView);
