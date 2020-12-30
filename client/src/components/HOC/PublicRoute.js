import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const authSelector = useSelector((state) => state.auth);
  const { isAuthenticate } = authSelector;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticate === true && restricted ? (
          // <Redirect to="/" />
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
