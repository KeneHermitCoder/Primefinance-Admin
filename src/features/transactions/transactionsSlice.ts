import TransactionsAPI from './TransactionsAPI';
import { ActionReducerMapBuilder, createSlice, } from '@reduxjs/toolkit';
import { handleFulfilledState, handlePendingState, handleRejectedState } from '../../utils';
import { ITransactionSliceState } from '../../contracts/interfaces/transactions.interrface';

const transactionsAPI = new TransactionsAPI();
const getTransactionsKPIData = transactionsAPI.getTransactionsKPIData;
const getMultipleTransactions = transactionsAPI.getMultipleTransactions;
const getTransactionOverviewData = transactionsAPI.getTransactionOverviewData;

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        allTransactionsData: {
            data: [],
            error: null,
            isLoading: true,
            success: false,
        },
        transactionOverviewData: {
            data: [],
            error: null,
            isLoading: true,
            success: false,
        },
        transactionKPIData: {
            data: {
                totalTranxCount: 0,
                failedTranxCount: 0,
                totalTransactions: 0,
                pendingTranxCount: 0,
                failedTransactions: 0,
                pendingTransactions: 0,
                successfulTranxCount: 0,
                successfullTransactions: 0,
            },
            error: null,
            isLoading: true,
            success: false,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMultipleTransactions.pending, handlePendingState('allTransactionsData'))
            .addCase(getMultipleTransactions.fulfilled, handleFulfilledState('allTransactionsData'))
            .addCase(getMultipleTransactions.rejected, handleRejectedState('allTransactionsData'))
            .addCase(getTransactionOverviewData.pending, handlePendingState('transactionOverviewData'))
            .addCase(getTransactionOverviewData.fulfilled, handleFulfilledState('transactionOverviewData'))
            .addCase(getTransactionOverviewData.rejected, handleRejectedState('transactionOverviewData'))
            .addCase(getTransactionsKPIData.pending, handlePendingState('transactionKPIData'))
            .addCase(getTransactionsKPIData.fulfilled, handleFulfilledState('transactionKPIData'))
            .addCase(getTransactionsKPIData.rejected, handleRejectedState('transactionKPIData'));
    },
} as {
    name: string;
    initialState: ITransactionSliceState;
    reducers: any;
    extraReducers: (builder: ActionReducerMapBuilder<ITransactionSliceState>) => void;
});

export const { reducer: transactions, } = transactionsSlice;