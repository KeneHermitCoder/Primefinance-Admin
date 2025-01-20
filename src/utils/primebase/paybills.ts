import { httpClient } from "./utils/httpClient";
import { PayBillResponse, PayBillHttpResponse, DataResponse, DataHttpResponse } from './utils/httpResponse';
import { PayBill } from "./interfaces";

const URL = "/api/paybills";

export class PayBillsAPI {
    private URL: string; // Declare the URL property

    constructor(URL: string) {
        this.URL = URL;
    }

    async billerList(): Promise<DataResponse> {
        const response = await httpClient(`${this.URL}/biller-list`, "GET", {}, true);

        return DataHttpResponse(response);
    }

    async billerCategories(categoryName: string) : Promise<DataResponse> {
        const response = await httpClient(`${this.URL}/biller-categories?categoryName=${categoryName}`, "GET", {}, true);

        return DataHttpResponse(response);
    }

    async billerItems(billerId: string, divisionId: string, productId: string ): Promise<DataResponse> {
        const response = await httpClient(`${this.URL}/biller-item?billerId=${billerId}&divisionId=${divisionId}&productId=${productId}`, "GET", {}, true);

        return DataHttpResponse(response);
    }

    async validateCustomer(customerId: string, divisionId: string, paymentItem: string, billerId: string): Promise<DataResponse> {
        const response = await httpClient(`${this.URL}/validate-customer?divisionId=${divisionId}&paymentItem=${paymentItem}&customerId=${customerId}&billerId=${billerId}`, "GET", {}, true);

        return DataHttpResponse(response);
    }

    async payBill(data: PayBill): Promise<PayBillResponse> {
        const response = await httpClient(`${this.URL}/paybill`, "POST", data, true);

        return PayBillHttpResponse(response);
    }
}
