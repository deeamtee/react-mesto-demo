import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props  }) => {
  console.log('hrllo');
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" replace/>
)}

export default ProtectedRoute;