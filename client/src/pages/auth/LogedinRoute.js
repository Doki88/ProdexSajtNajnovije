import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../../AppContext";

export default function LogedinRoute({ children }) {
    // const { userCredentials } = useContext(AppContext);

    // // if (!userCredentials || !userCredentials.token) {
    // if (!userCredentials) {

    //     // If no token, redirect to login
    //     return <Navigate to="/auth/login" replace />;
    // }
    // // console.log('Provjerio sam')
    // // Check role if required
    
    // // If logged in, render the protected page
    // return children;
  const { userCredentials } = useContext(AppContext);
  const location = useLocation();

  if (!userCredentials) {
    // User not authenticated → redirect to login with current location
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}
