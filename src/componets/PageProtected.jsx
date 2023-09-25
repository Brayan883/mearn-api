/* eslint-disable react/prop-types */
import { useEffect} from "react";
import { Outlet, Navigate } from "react-router-dom";

const PageProtected = ({ children }) => {
  const IsAuth = window.localStorage.getItem("IsUser") || false;  
  useEffect(() => {
    const expiresIn = 86400000;
    const startTime = window.localStorage.getItem("StartTime") || null;
    if (IsAuth && startTime) {            
      const elapsedTime = new Date().getTime() - parseInt(startTime, 10);
      if (elapsedTime < expiresIn) {                        
        const remainingTime = expiresIn - elapsedTime;        
        const timeoutId = setTimeout(() => {          
          window.localStorage.removeItem("IsUser");
          window.localStorage.removeItem("StartTime");
        }, remainingTime);
        return () => clearTimeout(timeoutId);
      } else {        
        window.localStorage.removeItem("IsUser");
        window.localStorage.removeItem("StartTime");
      }
    }
  }, [IsAuth]);
  if (!IsAuth) return <Navigate to="/" />;
  return (
    <>      
      {children ? children : <Outlet />}
    </>
  );
};

export default PageProtected;
