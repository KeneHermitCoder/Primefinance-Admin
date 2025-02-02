// kyc.ts
import { httpClient } from "./utils/httpClient";
import { KYCHttpResponse, KYCResponse } from "./utils/httpResponse";

export class KYC {
    private URL: string; // Declare the URL property

    constructor(URL: string) {
        this.URL = URL;
    }

    async livenessCheck(base64Image: string): Promise<KYCResponse> {
        const response = await httpClient(`${this.URL}/liveness`, "POST", { base64Image }, true);
        return KYCHttpResponse(response, "livenessCheck");
    }

    async bvnLookup(bvn: string): Promise<KYCResponse> {
        const response = await httpClient(`${this.URL}/bvn-lookup?bvn=${bvn}`, "GET", {}, true);
        return KYCHttpResponse(response, "bvnInfo");
    }

    async ninVerification(idNumber: string): Promise<KYCResponse> {
        const response = await httpClient(`${this.URL}/nin-verification`, "POST", { idNumber }, true);
        return KYCHttpResponse(response, "ninVerification");
    }
}
