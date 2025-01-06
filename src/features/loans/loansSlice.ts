import LoansAPI from './LoansAPI';
import { ActionReducerMapBuilder, createSlice, } from '@reduxjs/toolkit';

const loansAPI = new LoansAPI();
const getMutipleLoans = loansAPI.getMultipleLoans;

const loansSlice = createSlice({
    name: 'loans',
    initialState: {
        loans: [],
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
                console.log({ response, })
                state.loans = response as any;
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
    initialState: {
        loans: any[];
        error: null | string;
        success: boolean;
        isLoading: boolean;
    };
    reducers: any;
    extraReducers: (builder: ActionReducerMapBuilder<{
        loans: any[];
        error: null | string;
        success: boolean;
        isLoading: boolean;
    }>) => void;
});

export const { reducer: loans, } = loansSlice;
// export const { getMutipleLoans, } = loansSlice.actions