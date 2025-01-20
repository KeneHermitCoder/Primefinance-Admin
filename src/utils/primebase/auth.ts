import { httpClient } from "./utils/httpClient";
import { Transfer, } from "./interfaces";
import {
    UserResponse,
    DataResponse,
    UserHttpResponse,
    DataHttpResponse,
} from "./utils/httpResponse";

export class Auth {
    private URL: string; // Declare the URL property

    constructor(URL: string) {
        this.URL = URL;
    }

    async register(params: {
        email: string;
        name: string;
        surname: string;
        password: string;
        phone: string;
        bvn: string;
        nin: string;
        dob: string;
    }): Promise<UserResponse> {
        const response = await httpClient(`${this.URL}/create-client`, "POST", params, false);

        return UserHttpResponse(response);
    };

    async createAdmin(params: {
        email: string;
        name: string;
        surname: string;
        password: string;
        phone: string;
        dob: string;
    }): Promise<UserResponse> {
        const response = await httpClient(`${this.URL}/create-admin`, "POST", params, false);

        return UserHttpResponse(response);
    };

    async getUser(): Promise<UserResponse> {
        const response = await httpClient(`${this.URL}`, "GET", {}, true);

        return UserHttpResponse(response);
    };

    async updateUser(params: {
        first_name?: string;
        profile_photo?: string;
        surname?: string;
        address?: string;
        file?: string;
        dateOfBirth?: Date;
        sub?: string;
        wallet?: string;
        pin?: string;
        role?: "user" | "admin";
    }): Promise<UserResponse> {
        const response = await httpClient(`${this.URL}update-client`, "POST", params, false);

        return UserHttpResponse(response);
    };

    async login (email: string, password: string): Promise<UserResponse> {
        const response = await httpClient(`${this.URL}/login`, "POST", { email, password }, false);

        return UserHttpResponse(response);
    };

    async logout(): Promise<DataResponse> {
        const response = await httpClient(`${this.URL}/logout`, "POST", {}, true);

        return DataHttpResponse(response);
    };

    async changePassword(
        oldPassword: string,
        newPassword: string
    ): Promise<DataResponse> {
        const response = await httpClient(`${this.URL}/change-password`, "POST", {
          oldPassword,
          newPassword
        }, false);

        return DataHttpResponse(response);
    };

    async accountEnquiry (accountNo: string, bank: string, transferType: string): Promise<DataResponse> {
        const response = await httpClient(`${this.URL}/account-enquiry?accountNo=${accountNo}&bank=${bank}&transfer_type=${transferType}`, "GET", { }, true);

        return DataHttpResponse(response);
    };

    async primeEnquiry (accountNumber?: string): Promise<DataResponse> {
        const response = await httpClient(`${this.URL}/my-enquiry${accountNumber? `?accountNumber=${accountNumber}` : ""}`, "GET", { }, true);

        return DataHttpResponse(response);
    };

    async bankListing (): Promise<DataResponse> {
        const response = await httpClient(`${this.URL}/bank-listing`, "GET", { }, false);

        return DataHttpResponse(response);
    };

    async transfer (params: Transfer): Promise<DataResponse> {
        const response = await httpClient(`${this.URL}/transfer`, "POST", params, false);

        return DataHttpResponse(response);
    };
}

