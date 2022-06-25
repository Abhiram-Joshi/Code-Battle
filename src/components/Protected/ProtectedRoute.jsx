import React from "react";
import { Route, Navigate } from "react-router-dom";
import cookie from "react-cookies";

const ProtectedRoute = ({ component: Component, redirect, ...rest }) => {
    const key = cookie.load("key");
    return (
        <Route
            {...rest}
            render={(props) =>
                key ? <Component {...props} /> : <Navigate to={redirect} />
            }
        />
    );
};

export default ProtectedRoute;