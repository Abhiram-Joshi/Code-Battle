import React from "react";
import { Navigate} from "react-router-dom";
import cookie from "react-cookies";

const ProtectedRoute = ({ children}) => {
    const key = cookie.load("key");
    if (!key) {
        return <Navigate to="/" replace />;
        }
        return children; 
};

export default ProtectedRoute;