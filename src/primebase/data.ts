// kyc.ts
import { httpClient } from "./utils/httpClient";
import { TransactionHttpResponse, TransactionResponse, MessageHttpResponse, MessageResponse } from "./utils/httpResponse";

export class Data {
    URL: string;
   
    constructor(URL: string) {
        this.URL = URL;
    }

    async transaction(transactionId: string): Promise<TransactionResponse> {
        const response = await httpClient(`${URL}/transaction?transactionId=${transactionId}`, "GET", { }, true);

        return TransactionHttpResponse(response);
    }

    async transactions(): Promise<TransactionResponse> {
        const response = await httpClient(`${URL}/transactions`, "GET", { }, true);

        return TransactionHttpResponse(response);
    }

    async message(messageId: string): Promise<MessageResponse> {
        const response = await httpClient(`${URL}/message?messageId=${messageId}`, "GET", { }, true);

        return MessageHttpResponse(response);
    }

    async messages(): Promise<MessageResponse> {
        const response = await httpClient(`${URL}/messages`, "GET", { }, true);

        return MessageHttpResponse(response);
    }
}
