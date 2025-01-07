import { IResponseState } from "./common.interfaces";

interface ILoanOverview {
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
    page?: number;
    limit?: number;
}

export interface ILoanSliceState {
    allLoansData: IResponseState<any[]>;
    loanKPIData: IResponseState<{
        totalLoans: number;
        activeLoans: number;
        repaidLoans: number;
        dueLoans: number;
        overdueLoans: number;
        totalLoanRevenue: number;
    }>;
    loanOverviewData: IResponseState<any[]> & ILoanOverview;
}