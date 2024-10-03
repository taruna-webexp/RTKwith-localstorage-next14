import axios from "axios";
import { getSession } from "next-auth/react";

const ApiClient = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const instance = axios.create({
    baseURL,
  });
  instance.interceptors.request.use(
    async (config) => {
      const session = await getSession();
      Object.assign(config.headers, { "Content-Type": "application/json" });
      if (session) {
        Object.assign(config.headers || {}, {
          "x-access-token": session?.user?.accessToken,
        });
      }
      return config;
    },
    (error) => {
      console.log("error", error);
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (config) => {
      return config.data?.data?.users;
    },
    (error) => {
      console.log("error", error);
      return Promise.reject(error);
    }
  );
  return instance;
};
export default ApiClient;

// Example Taken from
/*https://www.youtube.com/watch?v=X9BaeQuVCQ8
https://coderomeos.org/axios-interceptors-in-a-react-application */
