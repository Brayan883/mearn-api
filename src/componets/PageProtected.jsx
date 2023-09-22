/* eslint-disable react/prop-types */
import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../store/Store";

const PageProtected =  ({ children }) => {  
  const IsAuth =  useStore((state) => state.IsAuth);
  const Token =  useStore((state) => state.Token);
  if (!IsAuth && !Token) {
    return <Navigate to="/" />;
  }
  return children ? children : <Outlet />;
};

export default PageProtected;
