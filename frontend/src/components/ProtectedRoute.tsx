import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return localStorage.getItem("auth_token")
    ? children
    : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
