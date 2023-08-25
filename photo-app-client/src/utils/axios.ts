import axios from 'axios';
import getConfig from 'next/config';

const axiosInstance = axios.create({
  baseURL: getConfig().publicRuntimeConfig.API_BASE_URL
});

export default axiosInstance;
