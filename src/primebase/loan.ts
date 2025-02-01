// loan.ts
import { httpClient,  } from "./utils/httpClient";
import { LoanHttpResponse, LoanResponse } from "./utils/httpResponse";

export class Loan {
    private URL: string; // Declare the URL property

    constructor(URL: string) {
        this.URL = URL;
    }
    
    async createAndDisburseLoan(amount: number, duration: number, transactionId: string): Promise<LoanResponse> {
        const response = await httpClient(`${this.URL}/create-and-disburse-loan`, "POST", { amount, duration, transactionId }, true);
        return LoanHttpResponse(response);
    }

    async loanTransactionStatus(transactionId: string): Promise<LoanResponse> {
        const response = await httpClient(`${this.URL}/loan-transaction-status`, "POST", { transactionId }, true);
        return LoanHttpResponse(response);
    }

    async createClientLoan(params: {
        first_name: string;
        last_name: string;
        dob: string;
        nin: string;
        email: string;
        bvn: string;
        phone: string;
        address: string;
        company: string;
        company_address: string;
        annual_income: number;
        guarantor_1_name: string;
        guarantor_1_phone: string;
        guarantor_2_name?: string;
        guarantor_2_phone?: string;
        amount: number;
        reason: string;
        base64Image?: string;
        outstanding?: number;
        category: string;
        type: string;
        status: string;
        duration: number;
        repayment_amount: number;
        percentage: number;
        loan_date: string; // assuming ISO date string
        repayment_date: string; // assuming ISO date string
        acknowledgment: boolean;
    }): Promise<LoanResponse> {
        const response = await httpClient(`${this.URL}/create-loan`, "POST", params, true);
        return LoanHttpResponse(response);
    }

    async loanPortfolio(userId: string): Promise<LoanResponse> {
        const response = await httpClient(`${this.URL}/loan-portfolio?user=${userId}`, "GET", {}, true);
        return LoanHttpResponse(response);
    }

    async repayLoan(params: {
        fromAccount: string;
        fromClientId: string;
        fromClient: string;
        fromSavingsId: string;
        fromBvn: string;
        toClientId: string;
        toClient: string;
        toSavingsId: string;
        toSession: string;
        toBvn: string;
        toAccount: string;
        toBank: string;
        signature: string;
        amount: number;
        remark: string;
        reference: string;
        userId: string;
        outstanding: number;
    }): Promise<LoanResponse> {
        const response = await httpClient(`${this.URL}/repay-loan`, "POST", params, true);
        return LoanHttpResponse(response);
    }

    async rejectLoan(transactionId: string): Promise<LoanResponse> {
        const response = await httpClient(`${this.URL}/reject-loan`, "POST", { transactionId }, true);
        return LoanHttpResponse(response);
    }

    async fetchAllLoans(page: number, limit: number): Promise<LoanResponse> {
        const response = await httpClient(
            `${this.URL}/getallLoans?page=${page}&limit=${limit}`, 
            "GET", 
            {}, 
            true
        );
        return LoanHttpResponse(response);
    }
    
    async getLoanOverviewData(page: number, limit: number): Promise<LoanResponse> {
        const response = await httpClient(
            `${this.URL}/getloanOverviewData?page=${page}&limit=${limit}`, 
            "GET",
            {}, 
            true
        );
        return LoanHttpResponse(response);
    }
    
    async getOverviewKpiData(page: number, limit: number): Promise<LoanResponse> {
        const response = await httpClient(
            `${this.URL}/getLoansKPIData?page=${page}&limit=${limit}`, 
            "GET", 
            {}, 
            true
        );
        return LoanHttpResponse(response);
    }
    
}
