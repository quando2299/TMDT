import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authSelector = useSelector((state) => state.auth);
  const { user } = authSelector;

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user._id ? (
          <Component {...props} />
        ) : (
          // <Redirect to="/signin" />
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
