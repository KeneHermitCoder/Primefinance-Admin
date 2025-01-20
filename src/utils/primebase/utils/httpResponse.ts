import { httpResult } from "./httpClient";
import { User } from "../interfaces";
import { LoanApplication, Transaction } from "../interfaces";

export interface KYCResponse {
  error: { message: string; } | null; // Response message
  data?: {
    livenessCheck?: any; // true if liveness check is successful
    bvnInfo?: any; // Any relevant BVN information returned
    ninVerification?: any; // true if NIN verification is successful
  } | null ;
}

export const KYCHttpResponse = (response: httpResult, type: "livenessCheck" | "bvnInfo" | "ninVerification"): KYCResponse => {
    const { data, message, status } = response;

    if (data && status === "success") {
        return { error: null, data: { [type]: data } };
    }

    return { error: { message }, data: null };
}

export interface UserResponse { data: { user: User } | null, error: { message: string } | null }

export const UserHttpResponse = (response: httpResult): UserResponse => {
    const { data, message, status } = response;

    if(data && status == "success"){
        const user: User  = data;

        return({ data: { user }, error: null });
    }

    return({ data: null, error: { message } });
}

export interface DataResponse { data: any | null, error: { message: string } | null }

export const DataHttpResponse = (response: httpResult): DataResponse => {
    const { data, message, status } = response;

    if(data && status == "success") return({ data, error: null });

    return({ data: null, error: { message } });
}

export interface LoanResponse { data: { loan: LoanApplication } | null, error: { message: string } | null }

export const LoanHttpResponse = (response: httpResult): LoanResponse => {
    const { data, message, status } = response;

    if(data && status == "success"){
        const loan: LoanApplication  = data;

        return({ data: { loan }, error: null });
    }

    return({ data: null, error: { message } });
};

export interface PayBillResponse { data: { transaction: Transaction } | null, error: { message: string } | null }

export const PayBillHttpResponse = (response: httpResult): PayBillResponse => {
    const { data, message, status } = response;

    if(data && status == "success"){
        const transaction: Transaction  = data;

        return({ data: { transaction }, error: null });
    }

    return({ data: null, error: { message } });
};