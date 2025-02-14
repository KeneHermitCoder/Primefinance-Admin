import TransactionsAPI from './TransactionsAPI';
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { handleFulfilledState, handlePendingState, handleRejectedState } from '../../utils';
import { ITransactionSliceState } from '../../contracts/interfaces/transactions.interfaces';

const transactionsAPI = new TransactionsAPI();
export const getTransactionsKPIData = transactionsAPI.getTransactionsKPIData;
const getMultipleTransactions = transactionsAPI.getMultipleTransactions;
export const getTransactionOverviewData = transactionsAPI.getTransactionOverviewData;

const initialState: ITransactionSliceState = {
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
      successfulTransactions: 0,
      transactionsWithoutLoan: 0,
    },
    error: null,
    isLoading: true,
    success: false,
  },
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ITransactionSliceState>) => {
    builder
      // Handling getMultipleTransactions actions
      .addCase(getMultipleTransactions.pending, handlePendingState('allTransactionsData'))
      .addCase(getMultipleTransactions.fulfilled, handleFulfilledState('allTransactionsData'))
      .addCase(getMultipleTransactions.rejected, handleRejectedState('allTransactionsData'))

      // Handling getTransactionOverviewData actions
      .addCase(getTransactionOverviewData.pending, handlePendingState('transactionOverviewData'))
      .addCase(getTransactionOverviewData.fulfilled, handleFulfilledState('transactionOverviewData'))
      .addCase(getTransactionOverviewData.rejected, handleRejectedState('transactionOverviewData'))

      // Handling getTransactionsKPIData actions
      .addCase(getTransactionsKPIData.pending, handlePendingState('transactionKPIData'))
      .addCase(getTransactionsKPIData.fulfilled, handleFulfilledState('transactionKPIData'))
      .addCase(getTransactionsKPIData.rejected, handleRejectedState('transactionKPIData'));
  },
});

export const { reducer: transactions } = transactionsSlice;
