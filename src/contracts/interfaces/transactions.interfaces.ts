import { IResponseState } from "./common.interfaces";

interface ITransactionOverview {
    data: {
        id: string;
        name: string;
        type: string;
        amount: string;
        status: string;
        category?: string;
        created_at: string;
    }[];
    page?: number;
    limit?: number;
}

export interface ITransactionSliceState {
    allTransactionsData: IResponseState<any[]>;
    transactionKPIData: IResponseState<{
        totalTranxCount: number;
        failedTranxCount: number;
        totalTransactions: number;
        pendingTranxCount: number;
        failedTransactions: number;
        pendingTransactions: number;
        successfulTranxCount: number;
        successfulTransactions: number;
    }>;
    transactionOverviewData: IResponseState<any[]> & ITransactionOverview;
}