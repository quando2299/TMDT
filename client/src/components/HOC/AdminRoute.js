import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const authSelector = useSelector((state) => state.auth);
  const { user } = authSelector;

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user._id && user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default AdminRoute;
