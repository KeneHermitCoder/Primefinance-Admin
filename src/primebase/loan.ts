// loan.ts
import {ILoanKPIData, ILoanOverview, IResponseState} from '../contracts/interfaces';
import { httpClient, httpResult } from "./utils/httpClient";
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


    // Assuming `httpClient` returns a response of type `httpResult`
async fetchAllLoans(): Promise<IResponseState<ILoanOverview>> {
    try {
        // Perform the HTTP request
        const response: httpResult = await httpClient(`${this.URL}/getallLoan`, "GET", {}, true);

        // Ensure response contains data and structure it into IResponseState
        if (!response || !response.data) {
            return {
                data: { data: [], page: 1, limit: 10 },  // Default fallback values
                success: false,
                isLoading: false,
                error: "Invalid loan overview data received.",
            };
        }

        const loanOverview = this.handleLoanOverviewResponse(response as any);

        return {
            data: loanOverview,  // The loan data processed
            success: true,
            isLoading: false,
            error: null,  // No error
        };
    } catch (err) {
        return {
            data: { data: [], page: 1, limit: 10 },  // Default fallback values
            success: false,
            isLoading: false,
            error:  "An error occurred while fetching loans.",
        };
    }
}

    
    async getLoanOverviewData(): Promise<IResponseState<ILoanOverview>> {
        try {
            const response = await httpClient(`${this.URL}/getloanOverviewData`, "GET", {}, true);
    
            // Ensure the response has the expected data structure
            if (!response || !response.data) {
                return {
                    data: { data: [], page: 1, limit: 10 },  // Default fallback values
                    success: false,
                    isLoading: false,
                    error: "Invalid loan overview data received.",
                };
            }
    
            // Process and return data with IResponseState
            return {
                data: this.handleLoanOverviewResponse(response as any),
                success: true,
                isLoading: false,
                error: null,
            };
        } catch (err) {
            return {
                data: { data: [], page: 1, limit: 10 },  // Default fallback values
                success: false,
                isLoading: false,
                error:  "An error occurred while fetching loan overview data.",
            };
        }
    }
    
    async getOverviewKpiData(): Promise<IResponseState<ILoanKPIData>> {
        try {
            const response = await httpClient(`${this.URL}/getLoansKPIData`, "GET", {}, true);
    
            // Ensure the response has the expected data structure
            if (!response || !response.data) {
                return {
                    data: {
                        dueLoans: 0,
                        totalLoans: 0,
                        activeLoans: 0,
                        repaidLoans: 0,
                        overdueLoans: 0,
                        dueLoansRevenue: 0,
                        totalLoansRevenue: 0,
                        activeLoansRevenue: 0,
                        repaidLoansRevenue: 0,
                        overdueLoansRevenue: 0,
                    },
                    success: false,
                    isLoading: false,
                    error: "Invalid loan KPI data received.",
                };
            }
    
            // Process and return data with IResponseState
            return {
                data: this.handleLoanKPIResponse(response),
                success: true,
                isLoading: false,
                error: null,
            };
        } catch (err) {
            return {
                data: {
                    dueLoans: 0,
                    totalLoans: 0,
                    activeLoans: 0,
                    repaidLoans: 0,
                    overdueLoans: 0,
                    dueLoansRevenue: 0,
                    totalLoansRevenue: 0,
                    activeLoansRevenue: 0,
                    repaidLoansRevenue: 0,
                    overdueLoansRevenue: 0,
                },
                success: false,
                isLoading: false,
                error:  "An error occurred while fetching loan KPI data.",
            };
        }
    }
    
    
    private handleLoanOverviewResponse(response: IResponseState<ILoanOverview>): ILoanOverview {
        if (!response || !response.data) {
            throw new Error("Invalid loan overview data received.");
        }
    
        const { data, page = 1, limit = 10 } = response.data;
    
        return {
            data: data ?? [],  // Ensure it's an array or fallback
            page,              // Default page to 1 if not present
            limit              // Default limit to 10 if not present
        };
    }
    
    
    // Response handler for Loan KPI
    private handleLoanKPIResponse(response: any): ILoanKPIData {
        if (!response || !response.data) {
            throw new Error("Invalid loan KPI data received.");
        }
    
        const { dueLoans, totalLoans, activeLoans, repaidLoans, overdueLoans, dueLoansRevenue, totalLoansRevenue, activeLoansRevenue, repaidLoansRevenue, overdueLoansRevenue } = response.data;
    
        return {
            dueLoans: dueLoans ?? 0,
            totalLoans: totalLoans ?? 0,
            activeLoans: activeLoans ?? 0,
            repaidLoans: repaidLoans ?? 0,
            overdueLoans: overdueLoans ?? 0,
            dueLoansRevenue: dueLoansRevenue ?? 0,
            totalLoansRevenue: totalLoansRevenue ?? 0,
            activeLoansRevenue: activeLoansRevenue ?? 0,
            repaidLoansRevenue: repaidLoansRevenue ?? 0,
            overdueLoansRevenue: overdueLoansRevenue ?? 0,
        };
    }
    
}
