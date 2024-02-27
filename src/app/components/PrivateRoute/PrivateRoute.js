import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const token = useSelector((state) => state.authToken);
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
