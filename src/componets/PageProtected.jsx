/* eslint-disable react/prop-types */
import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../store/Store";
const PageProtected = ({ children }) => {
  const expiresIn = useStore((state) => state.expiresIn);
  const IsAuth = window.localStorage.getItem("IsUser" || false);
  const TokenExpire = expiresIn * 1000 - 6000;
  if (expiresIn && IsAuth) {    
    if (Date.now() > TokenExpire) {
      window.localStorage.removeItem("IsUser");
      return <Navigate to="/" />;
    }
  }
  if (!IsAuth && !expiresIn ) return <Navigate to="/" />;    
  return children ? children : <Outlet />;
};

export default PageProtected;
