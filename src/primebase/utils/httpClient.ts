import axios, { AxiosRequestConfig } from "axios";
import { APP_BASE_URL } from "../../lib/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface httpResult {
    data: any | null;
    message: string;
    status: string;
}

export const httpClient = async (url: string, method: string, data: any = {}, auth: boolean): Promise<httpResult> => {
  const access_token = await AsyncStorage.getItem("access_token");

  const config: AxiosRequestConfig = {
    baseURL: APP_BASE_URL,
    url,
    method: method.toUpperCase() as AxiosRequestConfig["method"],
    data,
    ...(auth? { headers: {
        Authorization: `Bearer ${access_token}`
    } } : { })
  };

  try {
    const response = await axios(config);
    console.log({ response });
    return { data: response.data.data, status: response.data.status, message: "" };
  } catch (error: any) {
    console.log({ error });
    return { data: null, message: error.response?.data?.message || error.message || "Request failed", status: "failed" };
  }
};
