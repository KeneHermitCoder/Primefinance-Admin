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