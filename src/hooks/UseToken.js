import { useEffect } from "react";
import { instance } from "../utlis/axiosConf";
import { useStore } from "../store/Store";

const UseToken = () => {
  const RefleshToken = useStore().refreshToken;  
  const token = useStore().token;

  console.log("token", { token  } );

  



  useEffect(() => {
    const requestIntercept = instance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRquest = error?.config;
        if (error?.response?.status === 401 && !prevRquest?.sent) {
          prevRquest.sent = true;
          await RefleshToken();
          prevRquest.headers["Authorization"] = `Bearer ${token}`;
          return instance(prevRquest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestIntercept);
      instance.interceptors.response.eject(responseIntercept);
    };
  }, [RefleshToken, token]);

  return instance;
};

export default UseToken;
