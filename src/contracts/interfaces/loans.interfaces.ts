import { IResponseState } from "./common.interfaces";

export interface ILoanOverview {
    data: {
        id: string;
        first_name: string;
        last_name: string;
        amount: string;
        // interest?: string;
        // currency?: string;
        status: string;
        repayment_date: string;
        percentage: string;
        base64Image: string
    }[];
    totalLoans?: number;
    page?: number;
    limit?: number;
    success: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface ILoanSliceState {
    allLoansData: IResponseState<any[]>;
    loanOverviewData: IResponseState<any[]> & ILoanOverview;
}