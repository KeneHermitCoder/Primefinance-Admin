import { ILoanSliceState } from '../../contracts';
import LoansAPI from './LoansAPI';
import { ActionReducerMapBuilder, createSlice, } from '@reduxjs/toolkit';

const loansAPI = new LoansAPI();
const getMutipleLoans = loansAPI.getMultipleLoans;

const loansSlice = createSlice({
    name: 'loans',
    initialState: {
        loans: [],
        totalLoans: 0,
        activeLoans: 0,
        repaidloans: 0,
        dueLoans: 0,
        overdueLoans: 0,
        loanRevenue: 0,
        loanInterest: 0,
        error: null,
        success: false,
        isLoading: false
    },
    reducers: {
        // getMutipleLoans: (state, action) => { state.loans = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMutipleLoans.pending, (state) => {
                state.isLoading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(getMutipleLoans.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                setTimeout(() => {
                    // state.success = false;
                }, 500);
                state.error = null;
                const response = action.payload;
                // state = {
                //     ...state,
                //     ...response
                // }
                state.loans = response.loans;
                state.totalLoans = response.totalLoans;
                state.activeLoans = response.activeLoans;
                state.repaidloans = response.repaidloans;
                state.dueLoans = response.dueLoans;
                state.overdueLoans = response.overdueLoans;
                state.loanRevenue = response.loanRevenue;
            })
            .addCase(getMutipleLoans.rejected, (state, action) => {
                state.isLoading = false;
                state.loans = [];
                state.success = false;
                // @ts-ignore
                state.error = action.error.message;
            })
    },
} as {
    name: string;
    initialState: ILoanSliceState;
    reducers: any;
    extraReducers: (builder: ActionReducerMapBuilder<ILoanSliceState>) => void;
});

export const { reducer: loans, } = loansSlice;
// export const { getMutipleLoans, } = loansSlice.actions