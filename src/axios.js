require('es6-promise').polyfill();
import axios from 'axios'
import stote from '@/store'
import baseURL from './env'

const instance = axios.create({
  baseURL,
  timeout: 1000
});

instance.interceptors.request.use(function (config) {
  config.headers = {
    'Authorization': stote.getters.token,
    'currentProjectId': stote.getters.currentProjectId
  };
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default instance
