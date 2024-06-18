import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import authRoute from "./components/auth/route";
import userRoute from "./components/route";
import ProtectedRoute from "./components/ProtectedRoute";

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
