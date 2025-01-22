import axios, { AxiosRequestConfig, Method } from 'axios';

const baseURL = import.meta.env.VITE_PUBLIC_API_BASE_URL;

const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface RequestOptions extends AxiosRequestConfig {
  method: Method;
  url: string;
  data?: any;
}

const httpClient = async (options: RequestOptions) => {
  try {
    const response = await client.request({
      method: options.method,
      url: options.url,
      data: options.data,
      headers: options.headers,
      params: options.params,
    });
    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error('HTTP Request Error:', error);
    throw error;
  }
};

export default httpClient;