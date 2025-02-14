import { IResponseState } from "./common.interfaces";

// Loan KPI response structure
export interface ILoanKPIData {
  dueLoans: number;
  totalLoans: number;
  activeLoans: number;
  repaidLoans: number;
  overdueLoans: number;
  dueLoansRevenue: number;
  totalLoansRevenue: number;
  activeLoansRevenue: number;
  repaidLoansRevenue: number;
  overdueLoansRevenue: number;
}
export type LoanKPIResponse = IResponseState<ILoanKPIData>;
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
    base64Image: string;
  }[];
  page?: number;
  limit?: number;
}

export interface ICreditScore {
    loanId: string;
    lastReported: string;
    creditorName: string;
    totalDebt: string;
    accountype: string;
    outstandingBalance: number;
    activeLoan: number;
    loansTaken: number;
    income: number;
    repaymentHistory: string;
    openedDate: string;
    lengthOfCreditHistory: string;
    remarks: string;
    userId: string;
  };

export interface ILoanSliceState {
  allLoansData: IResponseState<any[]>;
  loanKPIData: IResponseState<{

    totalLoansCount: number;
    totalLoansAmount: number;

    dueLoansCount: number;
    dueLoansAmount: number;

    pendingLoansCount: number;
    pendingLoansAmount: number;

    activeLoansCount: number;
    activeLoansAmount: number;

    repaidLoansCount: number;
    repaidLoansAmount: number;

    overdueLoansCount: number;
    overdueLoansAmount: number;
  }>;
  loanOverviewData: IResponseState<any[]> & ILoanOverview;
  loanCreditScoreData: IResponseState<ICreditScore>;
  approveLoanData: IResponseState<any>;
  declineLoanData: IResponseState<any>;
}