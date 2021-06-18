import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../context/AuthProvider";

export default function PrivateRoute({ component: Component, ...props }) {
  const { user } = useAuth();
  return (
    <Route
      {...props}
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}
