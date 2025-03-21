import axios, { AxiosRequestConfig } from "axios";
import { APP_BASE_URL } from "../../lib/url";
import useAccessToken from "../../features/hooks/useAccessToken";

export interface httpResult {
    data: any | null;
    message: string;
    status: string;
}

export const httpClient = async (url: string, method: string, data: any = {}, auth: boolean): Promise<httpResult> => {
  // const access_token = await localforage.getItem("access_token");
  const access_token = await useAccessToken('get')
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
    return { data: response.data.data, status: response.data.status, message: "" };
  } catch (error: any) {
    return { data: null, message: error.response?.data?.message || error.message || "Request failed", status: "failed" };
  }
};
