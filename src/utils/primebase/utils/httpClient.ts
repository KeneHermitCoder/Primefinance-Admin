import axios, { AxiosRequestConfig } from "axios";
import useAccessToken from "../../../features/hooks/useAccessToken";
// import { APP_BASE_URL } from "../../lib/url";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export interface httpResult {
    data: any | null;
    message: string;
    status: string;
}

export const httpClient = async (url: string, method: string, data: any = {}, auth: boolean): Promise<httpResult> => {
  // const access_token = await AsyncStorage.getItem("access_token");
  const access_token = await useAccessToken('get');
  console.log("access_token", access_token);

  const config: AxiosRequestConfig = {
    // baseURL: APP_BASE_URL,
    baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
    url,
    method: method.toUpperCase() as AxiosRequestConfig["method"],
    data,
    ...(auth? { headers: {
        Authorization: `Bearer ${access_token}`
    } } : { })
  };

  try {
    const response = await axios(config);
    return { data: response.data.data, status: response.data.status, message: "" };
  } catch (error: any) {
    return { data: null, message: error.response?.data?.message || error.message || "Request failed", status: "failed" };
  }
};
