import axios from 'axios';
import { paramsSerializer } from '../utils/paramsSerializer';
import { BASE_URL } from "../contants/index";

// import _ from 'lodash'
axios.defaults.baseURL = BASE_URL;
axios.defaults.paramsSerializer = paramsSerializer;
axios.defaults.withCredentials = false;
// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    // Do something before request is sent
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

const errorHandler = e => {
  console.log(e);
  console.log('API ERROR', e.response);
  if (e.response && e.response.data && e.response.data.error) {
    return Promise.resolve(e.response.data);
  }
  if (e.response) {
    return Promise.resolve({ error: { code: e.response.status } });
  }
  return Promise.resolve();
};

export const getAPI = (target, params, settings = {}) =>
  axios
    .get(target, {
      ...settings,
      params: params || {},
    })
    .then(resp => Promise.resolve(resp))
    .catch(e => {
      console.log(e);
      console.log(target);
      return errorHandler(e);
    });

export const postAPI = (target, data) =>
  axios
    .post(target, data)
    .then(resp => Promise.resolve(resp))
    .catch(e => {
      console.log(e);
      return errorHandler(e);
    });

export const putAPI = (target, data) =>
  axios
    .put(target, data)
    .then(resp => Promise.resolve(resp))
    .catch(errorHandler);

export const delAPI = (target, data) =>
  axios
    .delete(target, data)
    .then(resp => Promise.resolve(resp))
    .catch(errorHandler);

export const postAPIConfig = (target, data, config) =>
  axios
    .post(target, data, config)
    .then(resp => Promise.resolve(resp))
    .catch(e => {
      console.log(e);
      return errorHandler(e);
    });
