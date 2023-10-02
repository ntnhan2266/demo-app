import { camelCaseKeys } from '@/utils/convert';
import axios, { AxiosInstance } from 'axios';

// Timeout 1 minute
const REQUEST_TIMEOUT = 60 * 1000;

interface IAxiosInstanceOptions {
  baseURL: string;
  headers?: Record<string, string>;
}

/**
 * Create and configure an Axios instance with interceptors for handling requests and responses.
 * @param {AxiosInstanceOptions} options - Configuration options for the Axios instance.
 * @returns {AxiosInstance} - Configured Axios instance.
 */
const createAxiosInstance = ({ baseURL = '', headers }: IAxiosInstanceOptions): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      // Modify the request config here, such as adding authentication headers
      // config.headers.Authorization = `Bearer ${getToken()}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      // Modify the response here before it reaches the calling component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const modifiedResponseData = camelCaseKeys(response.data as Record<string, any>);
      return { ...response, data: modifiedResponseData };
    },
    (error) => {
      // You can handle errors globally here, such as redirecting to an error page
      return Promise.reject(error);
    },
  );

  return instance;
};

export default createAxiosInstance;
