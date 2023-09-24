/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PageProtected = ({ children }) => {
  const IsAuth = window.localStorage.getItem("IsUser") || false;
  const [timeRemaining, setTimeRemaining] = useState(0);
  useEffect(() => {
    const expiresIn = 86400000;
    const startTime = window.localStorage.getItem("StartTime") || null;
    if (IsAuth && startTime) {      
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - parseInt(startTime, 10);
      if (elapsedTime < expiresIn) {                        
        const remainingTime = expiresIn - elapsedTime;
        setTimeRemaining(remainingTime);
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
      {timeRemaining > 0 ? (
        <div className="text-2xl p-2 text-emerald-600 font-bold text-center"  > Tiempo restante: {Math.floor(timeRemaining / 3600000)} horas</div>
      ) : null}
      {children ? children : <Outlet />}
    </>
  );
};

export default PageProtected;
