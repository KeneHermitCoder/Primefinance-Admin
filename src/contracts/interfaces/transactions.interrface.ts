import { IResponseState } from "./common.interfaces";

interface ITransactionOverview {
    data: {
        id: string;
        first_name: string;
        last_name: string;
        amount: string;
        type: string;
        date: string;
        status: string;
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