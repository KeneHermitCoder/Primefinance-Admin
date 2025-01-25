import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import axios, { AxiosHeaders, AxiosError } from 'axios';

export { User } from '@supabase/supabase-js';

const supabaseUrl = String(process.env.EXPO_PUBLIC_SUPABASE_URL)
const supabaseAnonKey = String(process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    fetch: async (url, config) => {
      try {
        // console.log({
        //   url: url as string,
        //   method: config?.method || 'GET',
        //   headers: config?.headers as AxiosHeaders,
        //   data: config?.body,
        // });

        // Perform the HTTP request using axios
        const result = await axios({
          url: url as string,
          method: config?.method || 'GET',
          headers: config?.headers as AxiosHeaders,
          data: config?.body,
        });

        // console.log({ result: result.data })

        // Convert the response data to JSON
        const responseBody = JSON.stringify(result.data);

        // Create a Headers object from axios response headers
        const responseHeaders = new Headers();
        Object.entries(result.headers || {}).forEach(([key, value]) => {
          responseHeaders.append(key, value as string);
        });

        // Return a Response object compatible with fetch API
        return new Response(responseBody, {
          headers: responseHeaders,
          status: result.status,
          statusText: result.statusText,
        });
      } catch (error: any) {
        // Handle errors and return a Response object
        const status = error.response?.status || 500;
        const message = error.message || 'An unknown error occurred';
        const errorResponse = {
          message,
          name: error.name,
          status,
        };

        return new Response(JSON.stringify(errorResponse), {
          status,
          statusText: message,
        });
      }
    },
  },
});

export const fetchUserData = async (token: string) => {
  const url = "https://etbywqoiugapcyltoiqb.supabase.co/auth/v1/user";
  const headers = {
    Authorization: `Bearer ${token}`,
    "X-Client-Info": "supabase-js-react-native/2.47.12",
    "X-Supabase-Api-Version": "2024-01-01",
    apikey: supabaseAnonKey,
  };

  try {
    const response = await axios({
      method: "GET",
      url: url,
      headers: headers,
    });

    console.log("User Data:", response.data);
    return response.data;
  } catch (error) { 
    console.error("Error fetching user data:", error);
    if(error instanceof AxiosError) {
      console.log({ error: error.response?.data.message || error.message })
    }
  }
};

