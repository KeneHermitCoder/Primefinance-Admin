import LoansAPI from './LoansAPI';
import { ILoanSliceState } from '../../contracts';
import { ActionReducerMapBuilder, createSlice, } from '@reduxjs/toolkit';

const loansAPI = new LoansAPI();
const getLoansKPIData = loansAPI.getLoansKPIData;
const getMutipleLoans = loansAPI.getMultipleLoans;
const getLoanOverviewData = loansAPI.getLoanOverviewData;


const handleRejectedState = (target: string) => (state: any, action: any) => {
    state[target].isLoading = false;
    state[target].success = false;
    // state.loanOverviewData.error = action.error.message || null;
    state[target].error = (action.payload as any)?.statusText || null;
}

const handleFulfilledState = (target: string) => (state: any, action: any) => {
    state[target].isLoading = false;
    state[target].success = true;
    state[target].error = null;
    state[target].data = action.payload;
}

const handlePendingState = (target: string) => (state: any) => {
    state[target].isLoading = true;
    state[target].success = false;
    state[target].error = null;
}

const loansSlice = createSlice({
    name: 'loans',
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
                totalLoanRevenue: 0,
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

export const { reducer: loans, } = loansSlice;