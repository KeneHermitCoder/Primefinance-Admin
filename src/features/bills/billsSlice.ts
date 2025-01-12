import BillsAPI from './BillsAPI';
import { ILoanSliceState } from '../../contracts';
import { ActionReducerMapBuilder, createSlice, } from '@reduxjs/toolkit';
import { handleFulfilledState, handlePendingState, handleRejectedState } from '../../utils';

const billsAPI = new BillsAPI();
const getLoansKPIData = billsAPI.getLoansKPIData;
const getMutipleLoans = billsAPI.getMultipleLoans;
const getLoanOverviewData = billsAPI.getLoanOverviewData;

const billsSlice = createSlice({
    name: 'bills',
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
            .addCase(getLoanOverviewData.pending, handlePendingState('loanOverviewData'))
            .addCase(getLoanOverviewData.fulfilled, handleFulfilledState('loanOverviewData'))
            .addCase(getLoanOverviewData.rejected, handleRejectedState('loanOverviewData'))
            .addCase(getLoansKPIData.pending, handlePendingState('loanKPIData'))
            .addCase(getLoansKPIData.fulfilled, handleFulfilledState('loanKPIData'))
            .addCase(getLoansKPIData.rejected, handleRejectedState('loanKPIData'));
    },
} as {
    name: string;
    initialState: ILoanSliceState;
    reducers: any;
    extraReducers: (builder: ActionReducerMapBuilder<ILoanSliceState>) => void;
});

export const { reducer: bills, } = billsSlice;