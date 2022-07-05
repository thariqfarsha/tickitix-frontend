import axios from "axios";

const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

// Add a request interceptor
axiosApiInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosApiInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 403) {
      if (error.response.data.msg !== "jwt expired") {
        localStorage.clear();
        window.location.href = "/signin";
      } else {
        const refreshToken = localStorage.getItem("refreshToken");
        axiosApiInstance
          .post("auth/refresh", { refreshToken })
          .then((res) => {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("refreshToken", res.data.data.refreshToken);
            window.location.reload();
          })
          .catch(() => {
            localStorage.clear();
            window.location.href = "/signin";
          });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
