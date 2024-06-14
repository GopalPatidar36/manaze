import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import authRoute from "./auth/route";
import userRoute from "./user/route";
import ProtectedRoute from "./ProtectedRoute";

const useAuth = () => {
  const token = useSelector((state) => state.auth.accessToken);
  return Boolean(token);
};

const RoutesComponent = () => {
  const isAuthenticated = useAuth();

  const routes = [{ path: "*", element: <Navigate to="/" /> }];

  if (isAuthenticated) {
    routes.push(...userRoute);
  } else {
    routes.push(...authRoute);
  }

  return routes.map((item) => {
    if (item.isAuthRoute) return item;
    return {
      ...item,
      element: <ProtectedRoute>{item.element}</ProtectedRoute>,
    };
  });
};

export default RoutesComponent;
