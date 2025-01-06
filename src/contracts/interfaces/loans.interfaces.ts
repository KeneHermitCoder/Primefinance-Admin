export interface ILoanOverviewTableData {
    loans: {
        loan_id: string;
        name: string;
        amount: string;
        interest: string;
        currency?: string;
        due_date: string;
        status: string;
        actions: ('approve' | 'reject')[]
    }[],
    totalLoans: number,
    page: number,
    limit: number,
}

export interface ILoanSliceState {
    loans: {
        id: string,
        first_name: string,
        last_name: string,
        amount: string,
        status: string,
        repayment_date: string,
        percentage: string,
        base64Image: string
    }[],
    totalLoans: number,
    activeLoans: number,
    repaidloans: number,
    dueLoans: number,
    overdueLoans: number,
    loanRevenue: number,
    loanInterest: number,
    success: boolean,
    isLoading: boolean,
    error: string | null,
}