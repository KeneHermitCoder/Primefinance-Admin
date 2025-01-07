import LoansAPI from './LoansAPI';
import { ILoanSliceState } from '../../contracts';
import { ActionReducerMapBuilder, createSlice, } from '@reduxjs/toolkit';

const loansAPI = new LoansAPI();
const getMutipleLoans = loansAPI.getMultipleLoans;
const getLoanOverviewData = loansAPI.getLoanOverviewData;

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
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMutipleLoans.pending, (state) => {
                state.allLoansData.isLoading = true;
                state.allLoansData.success = false;
                state.allLoansData.error = null;
            })
            .addCase(getMutipleLoans.fulfilled, (state, action) => {
                state.allLoansData.isLoading = false;
                state.allLoansData.success = true;
                state.allLoansData.error = null;
                state.allLoansData.data = action.payload;
            })
            .addCase(getMutipleLoans.rejected, (state, action) => {
                state.allLoansData.isLoading = false;
                state.allLoansData.success = false;
                state.allLoansData.error = action.error.message || null;
            })
            .addCase(getLoanOverviewData.pending, (state) => {
                state.loanOverviewData.isLoading = true;
                state.loanOverviewData.success = false;
                state.loanOverviewData.error = null;
            })
            .addCase(getLoanOverviewData.fulfilled, (state, action) => {
                state.loanOverviewData.isLoading = false;
                state.loanOverviewData.success = true;
                state.loanOverviewData.error = null;
                state.loanOverviewData.data = action.payload?.data || [];
                state.loanOverviewData.totalLoans = action.payload?.totalLoans || 0;
            })
            .addCase(getLoanOverviewData.rejected, (state, action) => {
                console.log({ rejectedAction: action, });
                state.loanOverviewData.isLoading = false;
                state.loanOverviewData.success = false;
                // state.loanOverviewData.error = action.error.message || null;
                state.loanOverviewData.error = (action.payload as any)?.statusText || null;
            })
    },
} as {
    name: string;
    initialState: ILoanSliceState;
    reducers: any;
    extraReducers: (builder: ActionReducerMapBuilder<ILoanSliceState>) => void;
});

export const { reducer: loans, } = loansSlice;