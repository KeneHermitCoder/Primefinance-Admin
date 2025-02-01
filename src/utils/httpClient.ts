// import axios, { AxiosRequestConfig, Method } from 'axios';
// import useAccessToken from '../features/hooks/useAccessToken';

// const baseURL = import.meta.env.VITE_PUBLIC_API_BASE_URL;

// const client = axios.create({
//   baseURL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// interface RequestOptions extends AxiosRequestConfig {
//   isAuth?: boolean;
//   method: Method;
//   url: string;
//   data?: any;
// }

// const httpClient = async (options: RequestOptions) => {
//   try {
//     const accessToken = useAccessToken('get');
//     // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50VHlwZSI6ImFkbWluIiwiaWQiOiI2Nzk5MGMxYzUxZWMwNzAxYzY5MzQyNTciLCJpYXQiOjE3MzgxMjQ1MTcsImV4cCI6MTc1Mzg0OTMxN30.EaTf8JKDMcZpNlj9zJqdC2GHeRQvJloc7SsV3gT0LzQ';
//     console.log({ accessToken,})
//     console.log(`${baseURL}${options.url}`)
//     if (!options.isAuth && options.headers) options.headers.Authorization = `Bearer  ${accessToken}`
//     const response = await client.request({
//       method: options.method,
//       url: options.url,
//       data: options.data,
//       headers: options.headers,
//       params: options.params,
//     });
//     return response.data;
//   } catch (error) {
//     // Handle error appropriately
//     console.error('HTTP Request Error:', error);
//     throw error;
//   }
// };

// export default httpClient;
import axios, { AxiosRequestConfig, Method } from 'axios';
import useAccessToken from '../features/hooks/useAccessToken';

const baseURL = import.meta.env.VITE_PUBLIC_API_BASE_URL;

const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface RequestOptions extends AxiosRequestConfig {
  isAuth?: boolean;
  method: Method;
  url: string;
  data?: any;
}

const httpClient = async (options: RequestOptions) => {
  try {
    const accessToken = useAccessToken('get');
    
    console.log({ accessToken });
    console.log(`${baseURL}${options.url}`);

    // Ensure headers exist and properly assign Authorization
    options.headers = options.headers || {}; // Initialize headers if undefined
    if (options.isAuth) {
      options.headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await client.request({
      method: options.method,
      url: options.url,
      data: options.data,
      headers: options.headers,
      params: options.params,
    });

    return response.data;
  } catch (error) {
    console.error('HTTP Request Error:', error);
    throw error;
  }
};

export default httpClient;
