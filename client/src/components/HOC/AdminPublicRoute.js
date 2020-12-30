import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AdminPublicRoute = ({ component: Component, ...rest }) => {
  const authSelector = useSelector((state) => state.auth);
  const { user } = authSelector;

  return (
    <Route
      {...rest}
      render={(props) =>
        user === null ? (
          <Component {...props} />
        ) : (
          // <Redirect to="/signin" />
          <Redirect
            to={{
              pathname: "/admin/dashboard",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminPublicRoute;
