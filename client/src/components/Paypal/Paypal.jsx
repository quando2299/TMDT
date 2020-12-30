import React from "react";
import PropTypes from "prop-types";
import PaypalExpressBtn from "react-paypal-express-checkout";

const Paypal = (props) => {
  const onSuccess = (payment) => {
    props.onSuccess(payment);
  };

  const onCancel = (data) => {
    console.log("The payment was cancelled!", data);
  };

  const onError = (err) => {
    console.log("Error!", err);
  };

  let env = "sandbox";
  let currency = "USD";
  let total = props.toPay;
  const client = {
    sandbox:
      "AV4nWxBugruoTPtbyRfYCqBxTI26-B65nHNlOCRtsZwnbDm9uOjlYsM5kQg8ZWV08BG0b-WaIc9wtB3s",
    production: "YOUR-PRODUCTION-APP-ID",
  };

  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
      style={{
        size: "large",
        color: "blue",
        shape: "rect",
        label: "checkout",
      }}
    />
  );
};

Paypal.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Paypal;
