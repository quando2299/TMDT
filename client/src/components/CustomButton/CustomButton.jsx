import React from "react";
import "./CustomButton.scss";

const CustomButton = ({ children, ...props }) => {
  return (
    <button className="btn-solid" {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
