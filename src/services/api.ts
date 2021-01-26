const axios = require('axios');

const BACKEND_BASE_URL = 'http://localhost:3002';
const API_TIMEOUT = 5000;

const apiCall = async (
  type: string,
  url: string,
  param: any,
  options?: any
) => {
  let opt = {
    timeout: API_TIMEOUT,
    ...options,
  };
  if (type === 'get' || type === 'delete') {
    return axios[type](`${BACKEND_BASE_URL}${url}`, opt);
  }
  return axios[type](`${BACKEND_BASE_URL}${url}`, param, opt);
};

const fetchApartments = (query: any) => apiCall('post', '/fetch', query);

export default {
  fetchApartments,
};
