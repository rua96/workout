import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = () => {
  const { auth } = useContext(AuthContext);

  return auth ? <Outlet /> : <Navigate to="/entry" />;
};
