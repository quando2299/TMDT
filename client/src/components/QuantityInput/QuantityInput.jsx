import React from "react";
import { connect } from "react-redux";
import { addItem, removeItem } from "../../redux/cart/cart.actions";
import "./QuantityInput.scss";

function QuantityInput(props) {
  const {
    quantity,
    detail,
    Increase,
    Decrease,
    addItem,
    removeItem,
    product,
  } = props;
  if (detail) {
    return (
      <div className="input-qty flex">
        <span className="input-group-prepend flex">
          <button
            type="button"
            className="btn quantity-left-minus"
            data-type="minus"
            data-field
            disabled={quantity === 1}
            onClick={Decrease}
          >
            <i className="fas fa-angle-left"></i>
          </button>
        </span>
        <input
          type="number"
          name="quantity"
          className="form-control input-number"
          value={quantity}
        />
        <span className="input-group-prepend flex">
          <button
            type="button"
            className="btn quantity-left-plus"
            data-type="plus"
            data-field
            onClick={Increase}
          >
            <i className="fas fa-angle-right"></i>
          </button>
        </span>
      </div>
    );
  }

  return (
    <div className="input-qty flex">
      <span className="input-group-prepend flex">
        <button
          type="button"
          className="btn quantity-left-minus"
          data-type="minus"
          data-field
          disabled={quantity === 1}
          onClick={() => removeItem(product)}
        >
          <i className="fas fa-angle-left"></i>
        </button>
      </span>
      <input
        type="number"
        name="quantity"
        className="form-control input-number"
        value={quantity}
      />
      <span className="input-group-prepend flex">
        <button
          type="button"
          className="btn quantity-left-plus"
          data-type="plus"
          data-field
          onClick={() => addItem(product, 1)}
        >
          <i className="fas fa-angle-right"></i>
        </button>
      </span>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item, quantity) => dispatch(addItem(item, quantity)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(QuantityInput);
