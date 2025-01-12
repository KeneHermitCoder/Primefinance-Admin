import { IResponseState } from "./common.interfaces";

interface ITransactionOverview {
    data: {
        id: string;
        name: string;
        type: string;
        amount: string;
        status: string;
        created_at: string;
    }[];
    page?: number;
    limit?: number;
}

export interface ITransactionSliceState {
    allTransactionsData: IResponseState<any[]>;
    transactionKPIData: IResponseState<{
        totalTranxCount: number;
        totalTransactions: number;
        pendingTranxCount: number;
        failedTranxCount: number;
        successfulTranxCount: number;
    }>;
    transactionOverviewData: IResponseState<any[]> & ITransactionOverview;
}