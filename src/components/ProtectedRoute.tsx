import type { JSX } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: JSX.Element;
  isAuthenticated: boolean;
};

const ProtectedRoute = ({ children, isAuthenticated }: ProtectedRouteProps) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
