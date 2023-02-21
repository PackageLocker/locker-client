import { axiosPrivate } from "../api/posts";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['x-access-token']) {
          config.headers['x-access-token'] = `${auth?.accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      (error) => Promise.reject(error)
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [auth])

  return axiosPrivate;
}

export default useAxiosPrivate;