import TransactionsAPI from './TransactionsAPI';
import { ILoanSliceState } from '../../contracts';
import { ActionReducerMapBuilder, createSlice, } from '@reduxjs/toolkit';
import { handleFulfilledState, handlePendingState, handleRejectedState } from '../../utils';

const transactionsAPI = new TransactionsAPI();
const getMutipleLoans = transactionsAPI.getMultipleLoans;

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        allLoansData: {
            data: [],
            error: null,
            isLoading: true,
            success: false,
        },
        loanOverviewData: {
            data: [],
            error: null,
            isLoading: true,
            success: false,
        },
        loanKPIData: {
            data: {
                dueLoans: 0,
                totalLoans: 0,
                activeLoans: 0,
                repaidLoans: 0,
                overdueLoans: 0,
                dueLoansRevenue: 0,
                totalLoansRevenue: 0,
                activeLoansRevenue: 0,
                repaidLoansRevenue: 0,
                overdueLoansRevenue: 0,
            },
            error: null,
            isLoading: true,
            success: false,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMutipleLoans.pending, handlePendingState('allLoansData'))
            .addCase(getMutipleLoans.fulfilled, handleFulfilledState('allLoansData'))
            .addCase(getMutipleLoans.rejected, handleRejectedState('allLoansData'))
    },
} as {
    name: string;
    initialState: ILoanSliceState;
    reducers: any;
    extraReducers: (builder: ActionReducerMapBuilder<ILoanSliceState>) => void;
});

export const { reducer: transactions, } = transactionsSlice;