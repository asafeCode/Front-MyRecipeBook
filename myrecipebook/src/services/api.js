// src/services/Api.js
import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

const apiRequest = (method, url, request, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return axiosAPI({
    method,
    url,
    data: request,
    headers,
  })
    .then((res) => Promise.resolve(res.data))
    .catch((err) => Promise.reject(err.response?.data || err));
};

const get = (url, request, token) => apiRequest("get", url, request, token);
const post = (url, request, token) => apiRequest("post", url, request, token);
const put = (url, request, token) => apiRequest("put", url, request, token);

export default { get, post, put };
