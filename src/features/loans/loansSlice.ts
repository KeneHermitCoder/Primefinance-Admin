import LoansAPI from './LoansAPI';
import { ILoanSliceState } from '../../contracts';
import { ActionReducerMapBuilder, createSlice, } from '@reduxjs/toolkit';

const loansAPI = new LoansAPI();
const approveLoan = loansAPI.approveLoan;
const declineLoan = loansAPI.declineLoan;
const getLoansKPIData = loansAPI.getLoansKPIData;
const getMutipleLoans = loansAPI.getMultipleLoans;
const getLoanOverviewData = loansAPI.getLoanOverviewData;
const getLoansCreditScoreData = loansAPI.getLoansCreditScoreData;


const handleRejectedState = (target: string) => (state: any, action: any) => {
  state[target].isLoading = false;
  state[target].success = false;
  // state.loanOverviewData.error = action.error.message || null;
  state[target].error = (action.payload as any)?.statusText || null;
}

const handleFulfilledState = <T>(target: string) => (state: any, action: any) => {
  state[target].isLoading = false;
  state[target].success = true;
  state[target].error = null;
  state[target].data = <T>action.payload;
}

const handlePendingState = (target: string) => (state: any) => {
  state[target].isLoading = true;
  state[target].success = false;
  state[target].error = null;
}

const loansSlice = createSlice({
  name: "loans",
  initialState: {
    allLoansData: {
      data: [],
      error: null,
      isLoading: false,
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
        loansRevenue: 0,

        totalLoansCount: 0,
        totalLoansAmount: 0,

        dueLoansCount: 0,
        dueLoansAmount: 0,

        pendingLoansCount: 0,
        pendingLoansAmount: 0,

        activeLoansCount: 0,
        activeLoansAmount: 0,

        repaidLoansCount: 0,
        repaidLoansAmount: 0,

        overdueLoansCount: 0,
        overdueLoansAmount: 0,

        disbursedLoansCount: 0,
        disbursedLoansAmount: 0,
      },
      error: null,
      isLoading: true,
      success: false,
    },
    loanCreditScoreData: {
      data: {
        loanId: "",
        userId: "",
        lastReported: "",
        creditorName: "",
        totalDebt: "",
        accountype: "",
        outstandingBalance: 0,
        activeLoan: 0,
        loansTaken: 0,
        income: 0,
        repaymentHistory: "",
        openedDate: "",
        lengthOfCreditHistory: "",
        remarks: "",
      },
      error: null,
      isLoading: true,
      success: false,
    },
    approveLoanData: {
      data: {},
      error: null,
      isLoading: false,
      success: false,
    },
    declineLoanData: {
      data: {},
      error: null,
      isLoading: false,
      success: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMutipleLoans.pending, handlePendingState("allLoansData"))
      .addCase(getMutipleLoans.fulfilled, handleFulfilledState("allLoansData"))
      .addCase(getMutipleLoans.rejected, handleRejectedState("allLoansData"))
      .addCase(getLoanOverviewData.pending, handlePendingState("loanOverviewData"))
      .addCase( getLoanOverviewData.fulfilled, handleFulfilledState("loanOverviewData"))
      .addCase(getLoanOverviewData.rejected, handleRejectedState("loanOverviewData"))
      .addCase(getLoansKPIData.pending, handlePendingState("loanKPIData"))
      .addCase(getLoansKPIData.fulfilled, handleFulfilledState("loanKPIData"))
      .addCase(getLoansKPIData.rejected, handleRejectedState("loanKPIData"))
      .addCase(getLoansCreditScoreData.pending, handlePendingState("loanCreditScoreData"))
      .addCase(getLoansCreditScoreData.fulfilled, handleFulfilledState("loanCreditScoreData"))
      .addCase(getLoansCreditScoreData.rejected, handleRejectedState("loanCreditScoreData"))
      .addCase(approveLoan.pending, handlePendingState("approveLoanData"))
      .addCase(approveLoan.fulfilled, handleFulfilledState("approveLoanData"))
      .addCase(approveLoan.rejected, handleRejectedState("approveLoanData"))
      .addCase(declineLoan.pending, handlePendingState("declineLoanData"))
      .addCase(declineLoan.fulfilled, handleFulfilledState("declineLoanData"))
      .addCase(declineLoan.rejected, handleRejectedState("declineLoanData"))
  },
} as {
  name: string;
  initialState: ILoanSliceState;
  reducers: any;
  extraReducers: (builder: ActionReducerMapBuilder<ILoanSliceState>) => void;
});

export const { reducer: loans, } = loansSlice;