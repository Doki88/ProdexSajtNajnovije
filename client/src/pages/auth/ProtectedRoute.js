import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

export default function ProtectedRoute({ children }) {
    const { userCredentials } = useContext(AppContext);

    // if (!userCredentials || !userCredentials.token) {
    if (!userCredentials) {

        // If no token, redirect to login
        return <Navigate to="/auth/login" replace />;
    }
    // console.log('Provjerio sam')
    // Check role if required
    if (!userCredentials.isAdmin) {
        return <Navigate to="/unauthorized" replace />;
    }
    // If logged in, render the protected page
    return children;
}
